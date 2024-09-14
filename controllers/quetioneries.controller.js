import { ApiError } from "../utils/Error.js";
import { Questions } from "../models/questioneries.model.js";
import { Volenteer } from "../models/volenteer.model.js";
import { Organization } from "../models/organization.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createQuetions = asyncHandler(async(req,res)=>{
    const {email,question} = req.body.data;
    const queId = req.params.queId;
    let volId;
    let comId;

    if (email === '' || question === '' || !email || !question){
        throw new ApiError(400, "Please enter all fields");
    }

    if (queId){
        const already1 = await Volenteer.findById(req.params.queId);
        if (!already1){
            const already2 = await Organization.findById(req.params.queId);
            if(already2){
                comId = already2._id;
            }
        } 
        else{
            volId = already1._id;
        }
    }

    if (volId){
        const que = Questions.create({
           email : email.toLowerCase().trim(),
           question : question.trim(),
           askedByVol : volId 
        })
        if (!que){
            throw new ApiError(500, "Error Accured while creating questioneries")
        }
        return res.status(200).json(
            new ApiResponse(200,que,"Questioneries Sended Successfully")
        )
    }else{
        const que = Questions.create({
            email : email.toLowerCase().trim(),
            question : question.trim(),
            askedByCom : comId
        })
        if (!que){
            throw new ApiError(500, "Error Accured While Creating Questioneries")
        }
        return res.status(200).json(
            new ApiResponse(200,que,"Questioneries Sended Successfully")
        )
    }

}) 


export {createQuetions};