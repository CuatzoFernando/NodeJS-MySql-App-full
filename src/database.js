
//requerimos el modulo de mysql
const mysql = require('mysql');
//requerimos util para hacer promesas 
const {promisify} = require('util');
// instanciamos el objeto que tiene los secrets
const {database} = require ('./keys.js');
//se crea la conexion a la base de datos con mysqlpool
const pool = mysql.createPool(database);
// conectamos a la base de datos y manejamos errores de conexion
pool.getConnection((err, connection) =>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXION CON LA BASE DE DATOS SE PERDIO');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DEMASIADAS CONEXIONES EN LA BASE DE DATOS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION A LA BASE DE DATOS ES RECHAZADA VERIFICA TUS CREDENCIALES');
        }
    }
    if (connection) connection.release();
    console.log('LA BASE DE DATOS SE CONECTO CON EXITO');
    return;

});
// cada vez que ncesite una consulta puedo usar promesas
pool.query = promisify(pool.query);
// exportmos el objeto pool con todo lo de arriba
module.exports =pool;
