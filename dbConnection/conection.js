const mongoose =require("mongoose");

const pass="instaya12345"
const data_base_name="instaya"
const uri= `mongodb+srv://alex:${pass}@cluster0.zkrixv6.mongodb.net/${data_base_name}?
retryWrites=true&w=majority`



module.exports= ()=> mongoose.connect(uri)


