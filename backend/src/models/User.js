import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "The user name is required."]
    },
    email: {
        type: String,
        required: [true, "The user email is required."],
        unique: true
    },
    peso: {
        type: Number,
        required: [true, "The user weight is required."]
    },
    nivel: {
        type: String,
        enum: {
            values:["beginner", "intermediate", "advanced", "pro"],
            message: "{VALUE} not valid."
        },
        required: [true, "The user level is required."],
    }

});

const User = mongoose.model('usuarios', userSchema);

export default User;
