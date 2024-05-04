import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }, 


})


