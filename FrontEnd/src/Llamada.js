import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import './style.css'

function Llamada() {
  const [mensajeBack, setMensajeBack] = useState(['']);
  const [nombre, setNombre] = useState(''); 
  const [apellido, setApellido] = useState(''); 
  const [edad, setEdad] = useState(''); 
  const [Personas, setPersonas] = useState([]); 
  const [PersonaNueva, setPersonaNueva] = useState(false); 

  function HandleObtener() {
    fetch('https://proyectofull-1.onrender.com/ApiBackend/Saludo')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en el back');
      }
      return response.json();
    })
    .then(data => {
      setMensajeBack(data.datos); 
      console.log('de una capo'); 
      
    })
  }

  function EnviarSaludo(event){
    event.preventDefault();
    console.log("El nombre es: " + nombre); 

    const datos ={
      nombre: nombre
    }

    fetch('https://proyectofull-1.onrender.com/ApiBackend/Saludo',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => { 
      if (!response.ok) {
        throw new Error('Error en el back');
      }
      return response.json();
    })
    .then(data => {
      setMensajeBack(data.mensaje); 
      console.log('de una capo'); 
    })
    .catch(error => {
      console.error('error:', error); 
    })
  }

  function ObtenerPersonas(){
    fetch('https://proyectofull-1.onrender.com/ApiBackend/Personas')
    .then(response => {
      if(!response.ok){
        throw new Error('Error en el back')
      }

      return response.json(); 
    })
    .then(data =>{
        if(data == undefined){
          console.log('Error');
        }else{
          setPersonas(data.personas)
        }
    })
    .catch(error => 
    {
      console.error('error:', error); 
    }
    )
  }

  function GuardarPersonas(e){
    e.preventDefault(); 
    const Personas = {
      nombre: nombre, 
      apellido: apellido, 
      edad: edad
    }

    fetch('https://proyectofull-1.onrender.com/ApiBackend/Personas', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(Personas)
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Error en el backend'); 
      }

      return response.json(); 
    })
    .then(() => {
      setPersonaNueva(!PersonaNueva); // Cambia el estado para que se vuelva a ejecutar el useEffect
    })
    .catch(error => {
      console.log('error', error)
    })
      
    
  }

  useEffect(() => {
    fetch('https://proyectofull-1.onrender.com/ApiBackend/Personas')
    .then(response => {
      if(!response.ok){
        throw new Error('Error en el back')
      }

      return response.json(); 
    })
    .then(data =>{
        if(data == undefined){
          console.log('Error');
        }else{
          setPersonas(data.personas)
        }
    })
    .catch(error => 
    {
      console.error('error:', error); 
    }
    )
    console.log('eu'); 

  },[PersonaNueva]); 

  return (
    <div className="App">
      <div ClassName="container">
        <button onClick={HandleObtener}>Obtener Mensaje</button>
          <h1>{mensajeBack}</h1>

      

        <form onSubmit={EnviarSaludo}>
          <input type='text' onChange={(e) => setNombre(e.target.value)} placeholder='Digita un saludo'></input>
          <br/>
          <br/>
          <button type='submit'>Enviar Saludo</button>
        </form>
      </div>
      
      
      <div className="container">
        <button onClick={ObtenerPersonas}>Obtener personas</button>
        <form>
          <input type='text' onChange={(e) => setNombre(e.target.value)} placeholder='Nombre'></input>
          <br/>
          <br/>
          <input type='text' onChange={(e) => setApellido(e.target.value)} placeholder='Apellido'></input>
          <br/>
          <br/>
          <input type='number' onChange={(e) => setEdad(e.target.value)} placeholder='Edad'></input>
          <br/>
          <br/>
          <button onClick={GuardarPersonas}>Guardar persona</button>
        </form>
      </div>

    <div style={{width: '80%'}}>
      { Personas.length === 0 || Personas == undefined ? <h5>No hay personas</h5> 
      
      :
      <table style={{border: '1px solid black', width: '100%'}}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
          </tr>
        </thead>
          <tbody>
            {Personas.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.edad}</td>
              </tr>
            ))}
          </tbody>
      </table>
      }
      
    </div>
    </div>
  );
}

export default Llamada;
