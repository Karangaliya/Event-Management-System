import { Events } from "../models/events.model.js";
import { Organization } from "../models/organization.model.js";
import { Volenteer } from "../models/volenteer.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary,deleteImage } from "../utils/cloudinary.js";
import { ApiError } from "../utils/Error.js";

const createEvent = asyncHandler(async(req,res)=>{
    const {eventTitle,discription,detailDiscription,location,city,timing,moneyGivenToOne} = req.body.data;
    const filePath = req.file?.path;
    let idd;

    if (!eventTitle || !discription || !detailDiscription || !location || !city || !timing  || eventTitle === '' || discription === '' || detailDiscription === '' || location === '' || city === '' || timing === ''  ) {
        throw new ApiError(400, "All fields are required")
    }

    const slug = eventTitle
            .split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, '')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');

    if(req.user){
        const vol = await Volenteer.findById(req.user._id);
        if(!vol.isAdmin){
            throw new ApiError(403,"You are Unauthorized to create an event")
        }
        idd = req.user._id;
    }
    else{
        const org = await Organization.findById(req.company._id);
        if(!org){
            throw new ApiError(400,"you cannot create the event")
        }
        idd = req.company._id;
    }

    if (moneyGivenToOne > 1000 || moneyGivenToOne <500){
        throw new ApiError(400,"Enter Amount in range of (500-1000)")
    }

    if (!filePath){
        throw new ApiError(400,"Image File Missing");
    }

    const newEventImage = await uploadOnCloudinary(filePath)
    if (!newEventImage.url){
        throw new ApiError(400,"Error while uploading image")
    }

    const existingEvent = await Events.findOne({
        $or: [{ eventTitle }, { slug }]
    })

    if (existingEvent){
        throw new ApiError(400,"This Title is taken by other")
    }

    const event = await Events.create({
        eventTitle : eventTitle.trim().toLowerCase(),
        discription,
        detailDiscription,
        location,
        city,
        slug,
        timing,
        image : newEventImage.url,
        publicId : newEventImage.public_id,
        moneyGivenToOne : moneyGivenToOne,
        createdBy : idd
    })

    if (!event){
        throw new ApiError(500,"Error while creating the Event")
    }

    return res.status(200).json(
        new ApiResponse(200,"Event Created Successfully")
    )
})


const updateEvent = asyncHandler(async(req,res)=>{
    const allUpdates = {};
    if (req.body.data.eventTitle){
        const alreadyHave1 = await Events.find({
            eventTitle : req.body.data.eventTitle
        })
        if (alreadyHave1){
            throw new ApiError(400,"Event Title is already Taken by another");
        }
        allUpdates.eventTitle = req.body.data.eventTitle;
    }

    if (req.body.data.discription){
        allUpdates.discription = req.body.data.discription;
    }
    if (req.body.data.detailDiscription){
        allUpdates.detailDiscription = req.body.data.detailDiscription;
    }
    if (req.body.data.location){
        allUpdates.location = req.body.data.location;
    }
    if (req.body.data.city){
        allUpdates.city = req.body.data.city;
    }
    if (req.body.data.moneyGivenToOne){
        allUpdates.moneyGivenToOne = req.body.data.moneyGivenToOne;
    }

    if (allUpdates != null){
        const finalEvent = await Events.findByIdAndUpdate(
            req.params.eventId,
            {
                $set : allUpdates
            },
            { new: true }
        )
        if (!finalEvent) {
            throw new ApiError(500, "Something Went Wrong while Updating Event")
        }

        return res.status(200).json(
            new ApiResponse(200, finalEvent, "Event Updated SuccessFully")
        )
    }
})


const updateImage = asyncHandler(async(req,res)=>{
    const filePath = req.file?.path;

    if (!filePath) {
        throw new ApiError(403, "Image file Missing");
    }

    const newImage = await uploadOnCloudinary(filePath);
    if (!newImage.url) {
        throw new ApiError(403, "Error while uploading an Image")
    }

    const event = await Events.findById(req.params.eventId);

    if (!event) {
        throw new ApiError(400, "Event Doesn't Found");
    }

    if (event.image && event.image !== "https://events.liveto.io/_next/static/media/default_event.82c17d7a.png") {
        const result = await deleteImage(event.publicId);
        if (result.result != 'ok') {
            throw new ApiError(500, "Some thing went wrong while deleteing image")
        }
    }

    const finalevent = await Events.findByIdAndUpdate(
        event._id,
        {
            $set: {
                image: newImage.url,
                publicId: newImage.public_id
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, finalevent, "image updated successfully")
        )
})


const getEvents = asyncHandler(async(req,res)=>{

    const qcity = req.query.city || null;
    if(!req.user){
        throw new ApiError(400,"You are unauthorized for get all events")
    }

    if (qcity != null){
        const events = await Events.find({ city : qcity })
        if(!events){
            throw new ApiError(400,"There no any Events Right now")
        }
    
        return res.status(200).json(
            new ApiResponse(200, events, "Event Fetched Successfully")
        )
    }else{
        const events = await Events.find({}).select("-createdBy -detailDiscription -publicId -location -slug -volenteerApplied")
        if(!events){
            throw new ApiError(400,"There no any Events Right now")
        }
    
        return res.status(200).json(
            new ApiResponse(200, events, "Event Fetched Successfully")
        )
    }

    
}) 

const cancelApplication = asyncHandler(async(req,res)=>{
    const eventId = req.params.eventId;

    if (!eventId) {
        throw new ApiError(400, "Never Gived Event iD")
    }

    const volenteer = await Volenteer.findById(req.user._id).select("-password");

    if (!volenteer) {
        throw new ApiError(400, "You can not see the Event")
    }

    const findevent = await Events.findById(eventId);

    const alreadyApplied = await Events.find({
        $and: [{ 
                _id : findevent._id 
            }, 
            { 
                volenteerApplied : volenteer._id
            }]
    });
    
    if (!alreadyApplied){
        throw new ApiError(400, "You never Appliend in this event");
    }

    const updatedEvent = await Events.findByIdAndUpdate(
        findevent._id,
        {
            $pull :{
                volenteerApplied : volenteer._id
            }
        },
        { new : true }
    )

    if (!updatedEvent){
        throw new ApiError(500, "Something went wrong while updating an event");
    }

    return res.status(200).json(
        new ApiResponse(200,updatedEvent,"Canceling the Application is successfull")
    )
})

const checkAppliedVol = asyncHandler(async(req,res)=>{
    const eventId = req.params.eventId;
    let applied = false;

    if (!eventId) {
        throw new ApiError(400, "Never Gived Event iD")
    }

    const volenteer = await Volenteer.findById(req.user._id).select("-password");

    if (!volenteer) {
        throw new ApiError(400, "You can not see the Event")
    }

    const findevent = await Events.findById(eventId);

    const alreadyApplied = await Events.find({
        $and: [{ 
                _id : findevent._id 
            }, 
            { 
                volenteerApplied : volenteer._id
            }]
    });
    
    console.log(alreadyApplied);

    if (alreadyApplied.length > 0){
        applied = true;
    }

    return res.status(200).json(
        new ApiResponse(200, applied, "Checking is complete")
    )
})

const getSingleEvent = asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;

    if (!eventId) {
        throw new ApiError(400, "Never Gived Event iD")
    }

    const findevent = await Events.findById(eventId);



    const eventtt = await Events.aggregate([
        {
            $match:{
                _id : findevent._id
            }
        },
        {
            $lookup:{
                from: "organizations",
                localField: "createdBy",
                foreignField : "_id",
                as : "Org_Name"
            }
        },
        {
            $addFields:{
                org_name : {
                    $first : "$Org_Name"
                }
            }
        },
        {
            $lookup:{
                from: "volenteers",
                localField: "volenteerApplied",
                foreignField: "_id",
                as : "AppliedVol"
            }
        },
        {
            $addFields:{
                countVol : {
                    $size : "$AppliedVol"
                }
            }
        },     
        {
            $project:{
                createdBy : 0,
                createdAt : 0,
                publicId : 0,
                slug : 0,
                updatedAt : 0,
                Org_Name : 0
            }
        }
    ])


    if (!eventtt){
        throw new ApiError(401,"Event does not found");
    }

    return res.status(200).json(
        new ApiResponse(200,  eventtt[0] , "Event Fetched SuccessFully")
    )
})

const volenteerApplied = asyncHandler(async(req,res)=>{
    const mobileNumber = req.body.mobileNumber;
    const volId = req.user?._id;
    const eventId = req.params.eventId;
    if (!volId){
        throw new ApiError(400,"CanNot find Volenteer Id");
    }
    const alreadyApplied = await Events.find({
        $and: [{ 
                _id : eventId 
            }, 
            { 
                volenteerApplied : volId
            }]
    })
    if (alreadyApplied.length != 0){
        throw new ApiError(400, "You Already Applied in Event");
    }

    const volenteer = await Volenteer.findByIdAndUpdate(
        volId,
        {
            $set : {
                mobileNo : mobileNumber
            }
        },
        { new: true }
    );

    if (!volenteer){
        throw new ApiError(401,"Cannot find the Volenteer profile")
    }
    
    if (volenteer.isAdmin){
        throw new ApiError(401, "You can not apply in because you are Admin");
    }


    const event = await Events.updateOne(
        {
            _id : eventId   
        },
        {
            $push : {
                volenteerApplied : volId
            }
        })

    if (!event){
        throw new ApiError(401,"Error while Updating event")
    }

    return res.status(200).json(
        new ApiResponse(200, event, "Applying in Event is Successfull")
    )
})


const appliedAllEvents = asyncHandler(async(req,res)=>{
        const userId = req.params.userId;
        const eventsFiltered = [];

        if (!userId){
            throw new ApiError(400,"Volenteer Id Is never Given");
        }

        const allEvent = await Events.find({
            volenteerApplied : userId
        })
        
        if (!allEvent){
            throw new ApiError(403, "You Never Applied in any Events");
        }

        allEvent.forEach(element => {
            const today = new Date();
            const carddate = new Date(element.timing);
            if (carddate >= today) {
                eventsFiltered.push(element);
            }
        });


        return res.status(200).json(
            new ApiResponse(200,eventsFiltered,"All Event Fatched")
        )
})
const finishedAllEvents = asyncHandler(async(req,res)=>{
        const userId = req.params.userId;
        const eventsFiltered = [];

        if (!userId){
            throw new ApiError(400,"Volenteer Id Is never Given");
        }

        const allEvent = await Events.find({
            volenteerApplied : userId
        })

        allEvent.forEach(element => {
            const today = new Date();
            const carddate = new Date(element.timing);
            if (carddate < today) {
                eventsFiltered.push(element);
            }
        });

        if (!allEvent){
            throw new ApiError(403, "You Never Applied in any Events");
        }

        return res.status(200).json(
            new ApiResponse(200,eventsFiltered,"All Event Fatched")
        )
})

const companyCurrentEvents = asyncHandler(async(req,res)=>{
    const companyId = req.params.companyId;
    const eventsFiltered = [];
    
    if (!companyId){
        throw new ApiError(400,"Oraganization Id Is never Given");
    }

    const allEvent = await Events.find({
        createdBy : companyId
    })
    
    if (!allEvent){
        throw new ApiError(403, "You Never Created Any Events");
    }
    
    allEvent.forEach(element => {
        const today = new Date();
        const carddate = new Date(element.timing);
        if (carddate >= today) {
            eventsFiltered.push(element);
        }
    });


    return res.status(200).json(
        new ApiResponse(200,eventsFiltered,"All Event Fatched")
    )
})

const companyFinishedEvents = asyncHandler(async(req,res)=>{
    const companyId = req.params.companyId;
    const eventsFiltered = [];
    
    if (!companyId){
        throw new ApiError(400,"Oraganization Id Is never Given");
    }

    const allEvent = await Events.find({
        createdBy : companyId
    })
    
    if (!allEvent){
        throw new ApiError(403, "You Never Created Any Events");
    }
    
    allEvent.forEach(element => {
        const today = new Date();
        const carddate = new Date(element.timing);
        if (carddate < today) {
            eventsFiltered.push(element);
        }
    });


    return res.status(200).json(
        new ApiResponse(200,eventsFiltered,"All Event Fatched")
    )
})


const rejectVol = asyncHandler(async(req,res)=>{
    const eventId = req.params.eventId;
    const creatorId = req.company?._id;
    const { rejectId } = req.body;

    if (!eventId){
        throw new ApiError(400,"Please Give Event Id");
    }

    const event = await Events.findById(eventId);
    if (!event){
        throw new ApiError(401,"There Is not Event");
    }

    if (!event.createdBy.equals(creatorId)){
        throw new ApiError(401,"You Are not the Creator of this Event so you can not reject volenteer");
    }

    const updatedEvent = await Events.findByIdAndUpdate(
        event._id,
        {
            $pull :{
                volenteerApplied : rejectId
            }
        },
        { new : true }
    )

    if (!updatedEvent){
        throw new ApiError(500, "Error Accur while updating Event");
    }

    return res.status(200).json(
        new ApiResponse(200,updatedEvent,"Volenteer Rejected SuccessFully")
    )
})


const deleteEvent = asyncHandler(async(req,res)=>{
    const eventId = req.params.eventId;
    const volId = req.user._id;

    if (!eventId){
        throw new ApiError(400,"Event Id is not given");
    }

    const volenteer = await Volenteer.findById(volId).select("-password");

    if (!volenteer.isAdmin){
        throw new ApiError("You can not allowed to delete Events");
    }

    await Events.findByIdAndDelete(eventId);
    return res.status(200).json(
        new ApiResponse(200,"Event deleted Successfully")
    )
})

export {createEvent,getEvents,getSingleEvent,volenteerApplied,appliedAllEvents,cancelApplication,checkAppliedVol,finishedAllEvents,companyCurrentEvents,companyFinishedEvents,rejectVol,updateEvent,updateImage,deleteEvent};