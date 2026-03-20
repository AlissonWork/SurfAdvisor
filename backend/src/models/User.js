import mongoose from "mongoose";
import bcrypt from "bcrypt";



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
    password: {
        type: String, 
        required:[true, "The user password is required"],
        select: false
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

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('usuarios', userSchema);

export default User;
