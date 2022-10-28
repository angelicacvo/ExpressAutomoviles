const { Router, request, response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser"); //liberia 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw());

mongoose.connect("mongodb+srv://administrador:hola@clusterg41.dn5kwgd.mongodb.net/BD_G43"); //conexión de la bd desde atlas

const vehicleSchema = new mongoose.Schema({ //formato json
    placa: String,
    tipoVehiculo : String,
    marca: String,
    anio: String,
    modelo: String,
    propietario: String,
    descripcion: String
});


const vehiculoModel = mongoose.model('vehiculos', vehicleSchema);

app.get('/', (request, response) => {  //ruta inicio
    response.send('hiciste una petición');
});

//Agregar
app.post("/AgregarVehiculo", function (request, response) {
    console.log(request.body);
  
    let vehiculoNuevo = new vehiculoModel({
        placa: request.body.placa,
        tipoVehiculo : request.body.tipoVehiculo,
        marca: request.body.marca,
        anio: request.body.anio,
        modelo: request.body.modelo,
        propietario: request.body.propietario,
        descripcion: request.body.descripcion
        });
  
    vehiculoNuevo.save(function (error, placa) {
      if (error) {
        response.send("Error al agregar vehiculo");
      } else {
        response.send("El vehiculo ha sido agregado");
      }
    });
  });


//Consultar
app.get('/Vehiculos', (request, response) => {  //ruta inicio
    vehiculoModel.find(function (error, placa) {
        response.send(placa);
    });
});

app.get('/VehiculoPorId', (request, response) => {  //ruta inicio
    vehiculoModel.find(
        {placa: request.body.placa | request.param("placa")}, 
        function (error, placa) {
            response.send(placa);
    });
});


//Borrar
app.delete("/EliminarVehiculo", function (request, response) {
    vehiculoModel.deleteOne(
        {placa: request.body.placa},
        function(error, placa){
            if (error) {
                response.send("Error en eliminar vehiculo");
            } else {
                response.send("Vehiculo eliminado correctamente");
            }
        }
    );    
});

//Editar
app.put("/EditarVehiculo", function (request, response) {
    console.log(request.body);
    const filter = {placa: request.body.placa};
    const update = {propietario: request.body.propietario};


    vehiculoModel.findOneAndUpdate(filter, update, function(error, placa){
            if (error) {
                response.send("Error en editar vechiculo");
            } else {
                response.send("Vehiculo editado correctamente");
            }
        });    
});


app.listen(3000, () => { //Esablece un canal de comunicación, una canal de entrada, 3000 es el puerto (localhost)
    console.log('Escuchando');
    //se inicia con npm start
});