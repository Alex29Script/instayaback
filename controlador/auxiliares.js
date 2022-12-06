const conn=require("../dbConnection/conection");
const UserModel=require("../models/user.model");
const registrar=require("./registrar");
const GuiaModel=require("../models/guia.model");

const user={
    username:"Liam",
    pass:"12345"
}





async function actualizar_pass(user={}){
    try{
        await conn();
        await UserModel.updateOne({username:user["username"]},{pass:await registrar.encriptar(user["pass"])});
        console.log("contrasena encriptada correctamente")
    }catch{
        console.log("error al actualizar")
    }

};

async function actualizar_estado_guias(){
    try{
        let n=0;
        let m=0;
        await conn();
        const guias=await GuiaModel.find();
        //console.log(guias, guias[0]["fecha"],typeof(guias));
        for (let i=0; i<guias.length; i++){
            //console.log(new Date(guias[i]["fecha"]));
            const date_guia= new Date(guias[i]["fecha"]);
            if((Date.now()-date_guia)>=1){
                await GuiaModel.updateOne({_id:guias[i]["_id"]},{estado:"Cumplido"});
                n=n+1
            }
            m=m+1
        }
        console.log("actualizador de guia terminado","guias actualizadas: ",n,"guias recorridas: ",m)

    }catch(err){
        console.error(err)
    }
}

async function actualizar_estado_guia(guia={}){
    try{
        await conn();
        const guias=await GuiaModel.findOne({_id:guia[0]["_id"]});
        const date_guia= new Date(guias["fecha"]);
        if((Date.now()-date_guia)>=1){
            await GuiaModel.updateOne({_id:guias["_id"]},{estado:"Cumplido"});
        }
        console.log("guia actualizada");
    }catch(err){
        console.error(err);
    }
}

function comparar_fecha_guia(guia={}){
    const fecha_guia=new Date(guia["fecha"]);
    //today=Date.now()
    //console.log(today)
    if((fecha_guia-Date.now())<68400000){
        return false;
    }else{
        return true;
    }
};


const guia={
    _id:"637c182a574384689ace765c",
    fecha: "2022-12-01T13:11:00.000+00:00"
}
//actualizar_estado_guia(guia)
//actualizar_pass(user);
//actualizar_estado_guias();
//comparar_fecha_guia(guia);

exports.actualizar_estado_guia=actualizar_estado_guia;
exports.actualizar_estado_guias=actualizar_estado_guias;
exports.comparar_fecha_guia=comparar_fecha_guia;





