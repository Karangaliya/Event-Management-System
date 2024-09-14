import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    eventTitle :{
        type : String,
        required : true,
        unique : true
    },
    slug:{
        type:String,
        unique :true,
        required : true
    },
    discription:{
        type: String,
        required: true
    },
    detailDiscription:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    timing:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        default:"https://events.liveto.io/_next/static/media/default_event.82c17d7a.png"
    },
    publicId:{
        type: String
    },
    moneyGivenToOne:{
        type: Number,
        required: true,
        min: 500,
        max: 1000
    },
    volenteerApplied:[
        {
            type:Schema.Types.ObjectId,
            ref: "Volenteer"
        }
    ],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref : "Organization"
    }
},
{
    timestamps:true
}
)

export const Events = mongoose.model("Events",eventSchema);