// test-doorbird.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { default: DoorBird, Scheme } = require('doorbird');

console.log('--- Iniciando prueba de conexión con DoorBird ---');

const ip = process.env.DOORBIRD_IP;
const user = process.env.DOORBIRD_USER;
const password = process.env.DOORBIRD_PASSWORD;

console.log('Usando las siguientes credenciales del archivo .env:');
console.log(`IP: ${ip}`);
console.log(`Usuario: ${user}`);
// No mostramos la contraseña por seguridad
console.log('-------------------------------------------------');

if (!ip || !user || !password) {
    console.error('ERROR: Faltan una o más variables de entorno (REACT_APP_DOORBIRD_IP, REACT_APP_DOORBIRD_USER, REACT_APP_DOORBIRD_PASSWORD) en tu archivo .env');
    process.exit(1);
}

const options = {
    ip: ip,
    username: user,
    password: password,
    scheme: Scheme.http
};

console.log('--- Objeto de opciones que se pasará al constructor ---');
console.log(options);
console.log('----------------------------------------------------');

const doorbird = new DoorBird(options);

doorbird.getInfo()
    .then(info => {
        console.log('✅ ¡CONEXIÓN EXITOSA!');
        console.log('La información de tu DoorBird es:');
        console.log(info);
    })
    .catch(err => {
        console.error('❌ FALLO LA CONEXIÓN.');
        console.error('El error recibido de la librería es:');
        console.error(err);
        console.log('\nSugerencias:');
        console.log('1. Verifica que la IP del DoorBird es correcta y que tu ordenador está en la misma red WiFi.');
        console.log('2. Vuelve a comprobar el usuario y la contraseña. Asegúrate de que no haya espacios extra.');
        console.log('3. Revisa si hay algún firewall en tu ordenador o en la red bloqueando la conexión.');
    });