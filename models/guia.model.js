const mongoose = require("mongoose")
const {Schema}= mongoose

const GuiaSchema=new Schema(
    {
        username: String,
        nit:String,
        fecha:String,
        largo:Number,
        ancho:Number,
        alto:Number,
        peso:Number,
        dir_recogida:String,
        ciudad_recogida:String,
        nombre_des:String,
        nit_des:String,
        dir_des:String,
        ciudad_des:String,
        estado:String,
        delicado:Boolean
    }
);

const GuiaModel=mongoose.model("guias",GuiaSchema);
module.exports=GuiaModel