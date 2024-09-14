import mongoose from "mongoose"
import { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const organizationSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is Needed"]
        },
        organizationName: {
            type: String,
            required: true,
            lowercase: true
        },
        profileImage: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        },
        publicId:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

organizationSchema.pre("save", async function (next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next();
    }
    next();
})

organizationSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


organizationSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        organizationName: this.organizationName
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
    });
}


export const Organization = mongoose.model("Organization", organizationSchema);