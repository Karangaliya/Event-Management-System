import mongoose, { Schema } from "mongoose";

const questioneriesSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    askedByVol:{
        type: Schema.Types.ObjectId,
        ref : "Volenteer"
    },
    askedByCom:{
        type: Schema.Types.ObjectId,
        ref : "Organization"
    }
})

export const Questions = mongoose.model("Questions",questioneriesSchema);