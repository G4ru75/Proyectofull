const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Nombres = []; 
const Personas =[];

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/ApiBackend/Saludo', (req, res) => {
    res.json({ datos: Nombres});
});

app.post('/ApiBackend/Saludo', (req, res) => {
    const { nombre } = req.body
    if (!nombre){
        return res.status(400).json({ error: 'Falta de parametros'})
    }else {
         Nombres.push(nombre); // Agrega el nombre al array
        res.json({ mensaje: `Hola ${nombre} estsamos en el back`})
    }
}); 

app.get('/ApiBackend/Personas', (req, res) => {
    if(Personas.length == 0 || Personas == undefined){
        return res.json({error: 'No hay personas'}); 
    }else{
        return res.json({personas: Personas})
    }
})

app.post('/ApiBackend/Personas', (req, res) =>{
    const {nombre, apellido, edad } = req.body; 
    if(!nombre || !apellido || !edad){
        return res.status(400).json({error: 'Faltan datos'})
    }else{
        Personas.push({nombre, apellido, edad}); 
        return res.json({mensaje: 'Datos recibidos correctamente'});
    }
}); 

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puerto ' + PORT);
});