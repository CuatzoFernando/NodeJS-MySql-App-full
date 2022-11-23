const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
//creamos la instancia
const app = express();
//configuramos el objeto 
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}))
app.set('view engine','.hbs');
//Middlewares
app.use(morgan('dev')); //indicamos que morgan nos mostrara lo que esta llegando al servidor
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Global Variables
app.use((req,res,next)=>{

    next();
})
//rutas o url de nuestro servidor
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/dashboard',require('./routes/dashboard.js'));
app.use('/clientes',require('./routes/clientes.js'));
app.use('/exclusiones',require('./routes/exclusiones.js'))

//archivos publicos
app.use(express.static(path.join(__dirname,'public')));
//arranque del servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto', app.get('port'));
});

