const { json } = require("body-parser");
const { isObjectIdOrHexString } = require("mongoose");
const conection = require("../dbConnection/conection");
const conn=require("../dbConnection/conection");
const GuiaModel = require("../models/guia.model");
const guia=require("../models/guia.model")
const aux=require("./auxiliares")

async function guias_user(user=String){
    try{
        await conn();
        const user_guias=await guia.find({username:user});
        console.log(user_guias);
        if (user_guias.length>0){
            respuesta={
                mensaje:"guías encontradas",
                valor:true,
                guias:{
                    user_guias: user_guias
                }
            };
            return respuesta;
        }else{
            respuesta={
                mensaje:"el usuario no posee guías",
                valor:false,
                guias:{
                    user_guias: null
                }
            };
            return respuesta;
        }


    }catch(err){
        respuesta={
            mensaje:"error al buscar las guías",
            valor:false,
            guias:{
                user_guias: null
            }
        };
        return respuesta;
    }
};

async function buscar_guia(id_guia=String, user=String){
        try{
            await conn();
            const guiaP=await guia.find({username:user,_id:id_guia})
            console.log(guiaP)
            if(guiaP.length>0){
                await aux.actualizar_estado_guia(guiaP);
                const guiaR=await guia.findOne({username:user,_id:id_guia})
                respuesta={
                    mensaje:"guía encontrada",
                    valor:true,
                    guias:{
                        user_guias: guiaR
                    }
                };
                return respuesta;
            }else{
                respuesta={
                    mensaje:"guía no encontrada",
                    valor:false,
                    guias:{
                        user_guias: null
                    }
                };
                return respuesta;
            };


        }catch(err){
            respuesta={
                mensaje:"error al encontrar una guía o guia no encontrada ",
                valor:false,
                guias:{
                    user_guias: null
                }
            
            };
            return respuesta;
        };
};

async function resgistrar_guias(guia={}){
    if(aux.comparar_fecha_guia(guia)===true){
        try{
            
            await conn();
            await GuiaModel.collection.insertOne(guia)
            console.log("guía registrada satisfactoriamente");
            respuesta={
                mensaje:"guía registrada satisfactoriamente",
                valor:true,
            };
            return(respuesta);


        }catch(err){
            console.log(err);
            respuesta={
                mensaje:"error al registrar una guía",
                valor:false,                  
            };
            return(respuesta);
        };
    }else{
        console.log("fecha de recogida es menor a 24 hr");
        respuesta={
            
            mensaje:"fecha de recogida es menor a 24 hr",
            valor:false,
        };
        return respuesta;
    };

};

async function actualizar_guia(guia={}){
        try{
            await conn();
            console.log(guia);
            filter={_id:guia["_id"], username:guia["username"]};
            delete guia["_id"];
            delete guia["username"];
            const res_mongo = await GuiaModel.updateOne(filter,guia);
            const respuesta={
                mensaje:"guía actualizada satisfactoriamente",
                valor:true,
                info:{
                    mongo: res_mongo,
                }                  
            };
            return (respuesta);

        }catch(err){
            console.log(err);
            respuesta={
                mensaje:"error al actualizar una guía",
                valor:false,                  
            };
            return(respuesta);
        };

};

async function cambiar_estado(guia={}){
    try{
        await conn();
        filter={_id:guia["_id"], username:guia["username"]};
        console.log(guia);
        const res_mongo = await GuiaModel.updateOne(filter,{estado:guia["estado"]});
        const respuesta={
            mensaje:"estado actualizado satisfactoriamente",
            valor:true,
            info:{
                mongo: res_mongo,
            }                  
        };
        return (respuesta);



    }catch{
        console.log(err);
            respuesta={
                mensaje:"error al actualizar un estado",
                valor:false,                  
            };
            return(respuesta);
    }
};

function comparar_fecha_guia(guia={}){
    const fecha_guia=new Date(guia["fecha"]);
    if((fecha_guia-Date.now())>1){
        return (fecha_guia-Date.now(), "mayor a 1")
    }else{
        return (fecha_guia-Date.now())
    }
};

async function buscar_guia_unica(id_guia=String){
    try {
        console.log(id_guia)
        await conn();
        const datos_guia=await GuiaModel.findOne({_id:id_guia})
        console.log(datos_guia)
        if(datos_guia){
            respuesta={
                mensaje:"guia encontrada",
                valor:true,
                guia:datos_guia
            }
            return respuesta
        }else{
            respuesta={
                mensaje:"guia no encontrada o no existe",
                valor:false,
                guia:null
            }
            return respuesta
        }
        
        
    } catch (error) {
        //console.log(error)
        respuesta={
            mensaje:"guia no encontrada o no existe",
            valor:false,
            guia:null
        }
        return respuesta
    }




}

exports.guias_user=guias_user;
exports.buscar_guia=buscar_guia;
exports.resgistrar_guias=resgistrar_guias;
exports.actualizar_guia=actualizar_guia;
exports.cambiar_estado=cambiar_estado;
exports.buscar_guia_unica=buscar_guia_unica;


