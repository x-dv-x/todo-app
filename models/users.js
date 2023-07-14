import mongoose from "mongoose";

// schema and model

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        },
    password: {
        type: String,
        required: true,
        minlength : 8, // at least six characters long
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model("User",schema);
