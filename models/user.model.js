const mongoose = require("mongoose");
const {Schema}= mongoose;

const UserSchema=new Schema(
    {
        username: String,
        pass: String,
        email: String

    }
)

const UserModel = mongoose.model("users",UserSchema);

module.exports=UserModel;