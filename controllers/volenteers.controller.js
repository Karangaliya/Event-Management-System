import { ApiError } from "../utils/Error.js"
import { Volenteer } from "../models/volenteer.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteImage, uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password || !fullName || username === '' || email === '' || password === '' || fullName === '') {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Volenteer.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(404, "User is Already Exist")
    }

    const user = await Volenteer.create({
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        fullName: fullName.trim().toLowerCase()
    })

    const newUser = Volenteer.findById(user._id).select(
        "-password -isAdmin"
    )

    if (!newUser) {
        throw new ApiError(500, "Something went wrong while Creating the user")
    }

    return res.status(201).json("Register Succesfull")
})


const loginUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        throw new ApiError(400, "All Fields are Empty")
    }
    // try {

    const user = await Volenteer.findOne({
        $and: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(402, "User Doesn't Exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password")
    }

    const accessToken = await user.generateAccessToken();

    const loggedUser = await Volenteer.findById(user._id).select(
        "-password"
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .json(
            new ApiResponse(200, loggedUser, "Login Successfull")
        )

    // } catch (error) {
    //     throw new ApiError(500, error)
    // }
})



const logOutUser = asyncHandler(async (req, res) => {
    try {
        const option = {
            httpOnly: true,
            secure: true
        }
        res.status(200).clearCookie("accessToken", option).json(new ApiResponse(200, "Log out SuccessFull"))
    } catch (error) {
        throw new ApiError(500, error)
    }
})


const getAllVolenteer = asyncHandler(async (req, res) => {

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = parseInt(req.query.sortDirection) === 'asc' ? 1 : -1;

    const allVolenteer = await Volenteer.find({}).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit).select("-password");

    if (!allVolenteer) {
        throw new ApiError(500, "There are not any Volenteer exists")
    }

    const countVolenteer = await Volenteer.countDocuments();

    if (countVolenteer <= 0) {
        throw new ApiError(500, "There are not any Volenteer exists");
    }

    res.status(200).json(
        new ApiResponse(200, { allVolenteer, countVolenteer }, "All User fetched successFull")
    )
})


const getVolenteer = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        throw new ApiError(400, "Never Gived userId")
    }

    if (req.user._id){
        const volis = await Volenteer.findById(req.user._id).select("-password");
        if(!volis.isAdmin){
            throw new ApiError(400,"You are unauthorized to get Other User Information")
        }
    }

    const volenteer = await Volenteer.findById(userId).select("-password");

    if (!volenteer) {
        throw new ApiError(400, "Volenteer Doesn't Exists")
    }

    return res.status(200).json(
        new ApiResponse(200, volenteer, "User Fetched SuccessFully")
    )
})

const updateProfileImage = asyncHandler(async (req, res) => {
    const filePath = req.file?.path;

    if (!filePath) {
        throw new ApiError(403, "Image file Missing");
    }

    const newprofileImage = await uploadOnCloudinary(filePath);
    if (!newprofileImage.url) {
        throw new ApiError(403, "Error while uploading an Profile Image")
    }

    const user = await Volenteer.findById(req.user?._id).select("-password");

    if (!user) {
        throw new ApiError(400, "User Doesn't Found");
    }

    if (user.profileImage && user.profileImage !== "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png") {
        const result = await deleteImage(user.publicId);
        if (result.result != 'ok') {
            throw new ApiError(500, "Some thing went wrong while deleteing image")
        }
    }

    const finaluser = await Volenteer.findByIdAndUpdate(
        user._id,
        {
            $set: {
                profileImage: newprofileImage.url,
                publicId: newprofileImage.public_id
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, finaluser, "Profile image updated successfully")
        )
})


const updateDetails = asyncHandler(async (req, res) => {
    const allUpdates = {};
    if (req.body.data.password) {
        const newpassword = req.body.data.password;
        const passUser = await Volenteer.findById(req.body.data._id ? req.body.data._id : req.user._id);
        if (!passUser) {
            throw new ApiError(401, "User Doesn't Exists");
        }
        passUser.password = newpassword;
        await passUser.save({ validateBeforeSave: false })
    }

    if (req.body.data.username) {
        allUpdates.username = req.body.data.username;
        const alreadyHave1 = await Volenteer.findOne({
            username: allUpdates.username
        })
        if (alreadyHave1) {
            throw new ApiError(401, "User Name is Already Taken by other");
        }
    }
    
    if (req.body.data.fullName) {
        allUpdates.fullName = req.body.data.fullName;
    }

    if (req.body.data.email) {
        allUpdates.email = req.body.data.email;
        const alreadyHave2 = await Volenteer.findOne({
            email: allUpdates.email
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
        const finaluser = await Volenteer.findByIdAndUpdate(
            req.body.data._id ? req.body.data._id : req.user._id,
            {
                $set: allUpdates
            },
            { new: true }
        ).select("-password");
        if (!finaluser) {
            throw new ApiError(500, "Something Went Wrong while Updating your profile")
        }

        return res.status(200).json(
            new ApiResponse(200, finaluser, "User Updated SuccessFully")
        )
    }
})

const deleteVol = asyncHandler(async (req, res) => {

    if (req.body._id) {
        if (req.params.userId != req.body._id) {
            const alreadyHave1 = await Volenteer.findById(req.params.userId);
            if (!alreadyHave1.isAdmin) {
                throw new ApiError(401, "You are not Eligible for the delete other user")
            }
        }
    }

    const userExist = await Volenteer.findById(req.body._id ? req.body._id : req.params.userId);

    if (!userExist) {
        throw new ApiError(402, "User Doesn't Exists")
    }

    await Volenteer.findByIdAndDelete(req.body._id ? req.body._id : req.params.userId)
    return res.status(200).json(
        new ApiResponse(200, "Volenteer Deleted Successfully")
    )
})


export { registerUser, loginUser, logOutUser, getAllVolenteer, getVolenteer, updateProfileImage, updateDetails, deleteVol };