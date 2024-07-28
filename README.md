**API KEY REALIZADA EN:**

**Encriptación:**
API Key: Utiliza una clave API generada aleatoriamente en base-36 (alfanumérica) para autenticar a los usuarios.
Generación de Clave API: La clave API se genera con una secuencia de 30 caracteres alfanuméricos (letras y números), generada usando una función en JavaScript que combina el método Math.random() con el formato base-36.

**Base de Datos: MYSQL (apikey)**

Esctructura de peliculas:
CREATE TABLE peliculas (
  peliculaId INT AUTO_INCREMENT PRIMARY KEY,
  generoId VARCHAR(255),
  titulo VARCHAR(255),
  sinopsis TEXT,
  fechaLanzamiento DATETIME,
  activo BOOLEAN
);

Esctructura de usuarios:
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  api_key VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


**Tecnologías y Herramientas Utilizadas:**

Lenguaje de Programación: JavaScript
Framework para el Servidor: Express
Herramienta de Monitorización: Nodemon


**MÉTODO DE USO:**

***************************USUARIOS*****************************
**POST USUARIO:**

URL: http://localhost:4000/api/register

JSON a enviar:

{
  "username": "nuevo_usuario"
}


Respuesta:

{
  "data": {
    "id": 2,
    "api_key": "ch14okiay2608k30cys2cx70ho12uh",
    "username": "nuevo_usuario"
  }
}

***************************PELICULAS*****************************
**GET PELICULAS:**

URL: http://localhost:4000/api/peliculas
HEADERS: x-api-key
VALUE: CLAVE (Ejemplo: ut9dvfe8zi5gibnmtifoc2pa2i92k5)

Respuesta:

{
  "data": [
    {
      "peliculaId": 1,
      "generoId": "Terror",
      "titulo": "Superbad",
      "sinopsis": "Dos amigos de la infancia intentan aprovechar su última noche juntos antes de ir a la universidad, enfrentando situaciones cómicas y embarazosas.",
      "fechaLanzamiento": "2024-07-28T06:00:00.000Z",
      "activo": 1
    }
  ]
}

**PUT PELICULAS:**

URL: http://localhost:4000/api/peliculas/id
HEADERS: x-api-key
VALUE: CLAVE (Ejemplo: ut9dvfe8zi5gibnmtifoc2pa2i92k5)

JSON a enviar:{
  "generoId": "Comedia",
  "titulo": "Superbad",
  "sinopsis": "Dos amigos de la infancia intentan aprovechar su última noche juntos antes de ir a la universidad, enfrentando situaciones cómicas y embarazosas.",
  "fechaLanzamiento": "2007-08-17T00:00:00",
  "activo": true
}

Respuesta: 

{
  "message": "Pelicula updated successfully."
}


**DELETE PELICULA:**

URL: http://localhost:4000/api/peliculas/id
HEADERS: x-api-key
VALUE: CLAVE (Ejemplo: ut9dvfe8zi5gibnmtifoc2pa2i92k5)


Respuesta:

{
  "message": "Pelicula deleted successfully."
}



**POST PELICULA:**

URL: http://localhost:4000/api/peliculas
HEADERS: x-api-key
VALUE: CLAVE (Ejemplo: ut9dvfe8zi5gibnmtifoc2pa2i92k5)

JSON a enviar:

{
  "generoId": "Acción",
  "titulo": "Inception",
  "sinopsis": "Un ladrón que roba secretos a través del uso de la tecnología de los sueños debe realizar una tarea imposible: implantar una idea en la mente de una persona.",
  "fechaLanzamiento": "2010-07-16T00:00:00",
  "activo": 1
}


Respuesta:

{
  "data": {
    "peliculaId": 3,
    "generoId": "Acción",
    "titulo": "Inception",
    "sinopsis": "Un ladrón que roba secretos a través del uso de la tecnología de los sueños debe realizar una tarea imposible: implantar una idea en la mente de una persona.",
    "fechaLanzamiento": "2010-07-16T00:00:00",
    "activo": 1
  }
}



