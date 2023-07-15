import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email already exists"],
    },
    image: {
        type: String,
    }

}); 

const User =  models.User || model("User", userSchema);

export default User;