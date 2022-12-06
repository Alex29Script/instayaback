const conn=require("../dbConnection/conection");
const UserModel= require("../models/user.model");
const encriptador=require("bcryptjs");

async function encriptar(pass_texto){
    const pass_encriptada= await encriptador.hash(pass_texto,10);
    return pass_encriptada;
};

async function comparar_pass(pass_texto,pass_encriptado){
    const validador=await encriptador.compare(pass_texto,pass_encriptado);
    return(validador);
};

async function buscar (text) {
    try{
        await conn();
        const usuario= await UserModel.find({username:text});
        console.log(usuario.length)
        if (usuario.length>0){
            console.log("ya existe usuario")
            return true;
        }else{
            console.log("no existe usuario")
            return false;
        }

    }catch(err){
        console.log(err);
    }};

async function registrar(res={}){

    try{
    const user_buscado=  await buscar(res["username"]);
    if (user_buscado==true){
        console.log("usuario ya esta registrado")
        return ({
            mensaje:"el usuario ya existe",
            valor:false
    
    });


    }else{
        await conn();
        res["pass"]=await encriptar(res["pass"]);
        await UserModel.collection.insertOne(res);
        console.log("usuario registrado correctamente");
        return({
            mensaje:"usuario registrado correctamente",
            valor:true});
    };
    }catch(err){
        console.log(err);
        return({
            mensaje:"Error al registrar el usuario",
            valor:false
    
    })
    };

};

async function login(res={}){

    try{
        const user_buscado=  await buscar(res["username"]);
        console.log(typeof(user_buscado));
        if (user_buscado==true){
            console.log("usuario encontrado")
            await conn();
            let usuario= await UserModel.find({username:res["username"]});
            console.log(typeof(usuario), usuario[0]["pass"]);
            if (await comparar_pass(res["pass"],usuario[0]["pass"])===true){
                console.log("coinciden")
                return true
            }else{
                console.log("no coinciden")
                return false
            }
        }else{
            console.log("no registrado")
            return false
        };
        }catch(err){
            console.log(err);
        };

};



//buscar("alex32api");

exports.registrar=registrar;
exports.login=login;
exports.encriptar=encriptar;


