import { ApiError } from "../utils/Error.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Organization } from "../models/organization.model.js";
import { uploadOnCloudinary,deleteImage } from "../utils/cloudinary.js";
import { Volenteer } from "../models/volenteer.model.js";

const registerCompany = asyncHandler(async (req, res) => {
    const { username, email, password, organizationName } = req.body;

    if (!username || !email || !password || !organizationName || username === '' || email === '' || password === '' || organizationName === '') {
        throw new ApiError(400, "All fields are empty");
    }

        const existingOrganization = await Organization.findOne({
            $or: [{ username }, { email }]
        })

        if (existingOrganization) {
            throw new ApiError(404, "Organization is already Exists")
        }

        const organization = await Organization.create({
            username : username.trim().toLowerCase(),
            email : email.trim().toLowerCase(),
            password : password.trim(),
            organizationName
        })

        const newOrganization = await Organization.findById(organization._id).select(
            "-password"
        );

        if (!newOrganization){
            throw new ApiError(500,"Something Went wrong while creating the organization")
        }

        return res.status(200).json("Register successfull")

})

const loginCompany = asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        throw new ApiError(400, "All Fields are Empty")
    }

        const organization = await Organization.findOne({
            $and: [{ username }, { email }]
        })

        if (!organization) {
            throw new ApiError(404, "Organization Doesn't Exists")
        }

        const isPasswordValid = await organization.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid Password")
        }

        const accessToken = await organization.generateAccessToken();

        const loggedOrganization = await Organization.findById(organization._id).select(
            "-password"
        )

        const option = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, option)
            .json(
                new ApiResponse(200, loggedOrganization, "Login Successfull")
            )

})

const logOutCompany = asyncHandler(async (req,res)=>{
    try {
        const option = {
            httpOnly : true,
            secure: true
        }
        res.status(200).clearCookie("accessToken",option).json(new ApiResponse(200,"Log out SuccessFull"))
    } catch (error) {
        throw new ApiError(500,error)
    }
})

const getAllCompany = asyncHandler(async(req,res)=>{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = parseInt(req.query.sortDirection) === 'asc'? 1 : -1;

        const allCompany = await Organization.find({}).sort({ createdAt : sortDirection}).skip(startIndex).limit(limit).select("-password");

        if (!allCompany){
            throw new ApiError(500, "There are not any Organization exists")
        }

        const countCompany = await Organization.countDocuments();

        if (countCompany <= 0){
            throw new ApiError(500, "There are not any Organization exists");
        }

        return res.status(200).json(
            new ApiResponse(200,{allCompany,countCompany},"Company data fetched successfully")
        )

})

const updateProfileImageC = asyncHandler(async (req,res)=>{
    const filePath = req.file?.path;

    if (!filePath){
        throw new ApiError(404,"Image file Missing");
    }

    const newprofileImage = await uploadOnCloudinary(filePath);
    if (!newprofileImage.url){
        throw new ApiError(404,"Error while uploading an Profile Image")
    }

    const company = await Organization.findById(req.company?._id).select("-password");

    if (!company){
        throw new ApiError(400,"Organization Doesn't Found");
    }

    if (company.profileImage && company.profileImage !== "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"){
        const result = await deleteImage(company.publicId);
        if (result.result != 'ok'){
            throw new ApiError(500,"Some thing went wrong while deleteing image")
        }
    }

    const finalcompany = await Organization.findByIdAndUpdate(
        company._id,
        {
            $set:{
                profileImage: newprofileImage.url,
                publicId: newprofileImage.public_id 
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, finalcompany, "Profile image updated successfully")
    )
})



const getCompany = asyncHandler(async(req,res)=>{
    const companyId = req.params.companyId;

    if (!companyId){
        throw new ApiError(400,"Never Gived CompanyId")
    }
        const company = await Organization.findById(companyId).select("-password");

        if (!company){
            throw new ApiError(400,"Organization Doesn't Exists")
        }

        return res.status(200).json(
            new ApiResponse(200,company,"Company Fetched Successfully")
        )
})

const updateDetails = asyncHandler(async (req, res) => {
    const allUpdates = {};
    if (req.body.data.password) {
        const newpassword = req.body.data.password;
        const passCompany = await Organization.findById(req.body.data._id ? req.body.data._id : req.company._id);
        if (!passCompany) {
            throw new ApiError(401, "Organization Doesn't Exists");
        }
        passCompany.password = newpassword;
        await passCompany.save({ validateBeforeSave: false })
    }

    if (req.body.data.username) {
        allUpdates.username = req.body.data.username;
        const alreadyHave1 = await Organization.findOne({
            username: allUpdates.username
        })
        if (alreadyHave1) {
            throw new ApiError(401, "User Name is Already Taken by other");
        }
    }
    if (req.body.data.organizationName) {
        allUpdates.organizationName = req.body.data.organizationName;
    }

    if (req.body.data.email) {
        allUpdates.email = req.body.data.email;
        const alreadyHave2 = await Organization.findOne({
            email : allUpdates.email
        })
        if (alreadyHave2) {
            throw new ApiError(401, "Email is Already taken by other");
        }
    }

    if (req.body.data._id) {
        if (req.params.userId != req.body.data._id) {
            const alreadyHave3 = await Volenteer.findById(req.params.userId);
            if (!alreadyHave3.isAdmin) {
                throw new ApiError(401, "You are not Eligible for change others Profile")
            }
        }
    }

    if (allUpdates !== null) {
        const finalcompany = await Organization.findByIdAndUpdate(
            req.body.data._id ? req.body.data._id : req.company._id,
            {
                $set: allUpdates
            },
            { new:true}
        ).select("-password");
        if(!finalcompany){
            throw new ApiError(500,"Something Went Wrong while Updating your profile")
        }

        return res.status(200).json(
            new ApiResponse(200,finalcompany,"Organization Updated SuccessFully")
        )
    }    
})


const deleteCom = asyncHandler(async(req,res)=>{
    
    if (req.body._id){
        if (req.params.userId != req.body._id) {
            const alreadyHave1 = await Volenteer.findById(req.params.userId);
            if (!alreadyHave1.isAdmin){
                throw new ApiError(401,"You are not Eligible for the delete other user")
            }
        }
    }

    const comExist = await Organization.findById(req.body._id? req.body._id : req.params.userId);

    if(!comExist){
        throw new ApiError(402,"Organization Doesn't Exists")
    }

    await Organization.findByIdAndDelete(req.body._id? req.body._id : req.params.userId)
    return res.status(200).json(
        new ApiResponse(200,"Organization Deleted Successfully")
    )
})


export {
    registerCompany,
    loginCompany,
    logOutCompany,
    getAllCompany,
    getCompany,
    updateProfileImageC,
    updateDetails,
    deleteCom
};