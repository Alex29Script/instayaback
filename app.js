"use strict";
const express=require("express");
const bodyParser=require("body-parser");
const conn=require("./dbConnection/conection")
const UserModel= require("./models/user.model")
const cors = require('cors')

//funciones
const resgistrar=require("./controlador/registrar")
const op_guias=require("./controlador/operacion_guias");
const aux=require("./controlador/auxiliares");

// creando app express
const app=express();
app.use(bodyParser.json());
app.use(cors());

//craedo la primera tuta express

setInterval(aux.actualizar_estado_guias,43200000);


app.get("/", async (req,res)=>{
    try{
        
        await conn();
        console.log("Conexion ok");
        const all_user= await UserModel.find();
        console.log (all_user);
        //res.send(all_user);
        console.log(typeof(all_user))
        
        res.contentType("application/json");
        const all_userJson=JSON.stringify(all_user);
        res.send(all_userJson)
    }
    catch(err){
        console.error(err);
    };

   /*  try{
        
        await conn();
        console.log("Conexion ok");
        const all_user= await UserModel.find({username:"alex32api"});
        console.log (all_user);
        //res.send(all_user);
        console.log(typeof(all_user))
        
    }
    catch(err){
        console.error(err);
    } */
  
});

app.post("/registrar", async (req, res)=>{

    const cabezera= req.headers;
    const respuesta = req.body;
    console.log( respuesta, respuesta["username"]);
    const respuestaP=await resgistrar.registrar(respuesta);
    const respuestaJSON=JSON.stringify(respuestaP);
    res.contentType("application/json");
    res.send(respuestaJSON);


});

app.post("/login", async (req,res)=>{

    const respuesta = req.body;
    console.log(respuesta)
    const estado_loguin= await resgistrar.login(respuesta);
    console.log(estado_loguin);
    res.contentType("application/json");
    if(estado_loguin==true){
        const respuestaJson={
            mensaje:"autenticado",
            auth:true
        }
        res.send(respuestaJson);
    }else{
        const respuestaJson={
            mensaje:"no autenticado",
            auth:false
        }
        res.send(respuestaJson);
    };
});

app.get("/guias/todas/", async (req,res)=>{

    
    const user=req.query;
    console.log(user);
    const resultado= await op_guias.guias_user(user["username"]);
    res.contentType("application/json");
    res.send(JSON.stringify(resultado));

});

app.get("/guia/buscar", async(req,res)=>{

    const user=req.query["username"];
    const id_guia=req.query["id_guia"];
    console.log(user,id_guia)
    const resultado= await op_guias.buscar_guia(id_guia, user);
    console.log(resultado);
    res.contentType("application/json");
    res.send(JSON.stringify(resultado));

});

app.post("/guia/agregar", async(req, res)=>{
    
    const guia=req.body["guia"];
    console.log(guia);
    res.contentType("application/json");
    if(guia===null){
        
        const resultado={
            mensaje:"Guia sin datos",
            valor:false
        }
        res.send(JSON.stringify(resultado));

    }else{

        const resultado= await op_guias.resgistrar_guias(guia);
        res.send(JSON.stringify(resultado));
        
    };


});

app.post("/guia/actualizar", async(req, res)=>{

    const guia=req.body["guia"];
    if(guia===null){
        
        const resultado={
            mensaje:"Guia sin datos para actualizar",
            valor:false
        }
        res.send(JSON.stringify(resultado));

    }else{
        
        const resultado= await op_guias.actualizar_guia(guia);
        res.send(JSON.stringify(resultado));
        
    };

});

app.get("/guia/buscar/unica/", async(req, res)=>{
    const id= req.query;
    console.log(id["id"])
    const resultado=await op_guias.buscar_guia_unica(id["id"])
    res.send(JSON.stringify(resultado));

});


app.get("/buscar/prueba/", async(req, res)=>{

    const user= await req.query;
    console.log(user);
    res.send(JSON.stringify(user));

});

//lanzamiento del servidor
app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});