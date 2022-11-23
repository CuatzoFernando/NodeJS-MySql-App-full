const express = require('express');
const router = express.Router();
const pool = require('../database');

//creando las rutas disponibles

//lista de todos los clientes
router.get('/',async (req,res)=>{
    const links = await pool.query('Select * from clientes');
    res.render('catalogos/listaCtes',{links})
})
//agregar un nuevo cliente
router.get('/add', (req, res)=>{
    res.render('catalogos/addCtes');
})


router.post('/add', async (req, res)=>{
    const {nombre_pdv, direccion, latitud, longitud} = req.body;
    const newlink =  {
        nombre_pdv,
       direccion,
       latitud,
       longitud
       
    };
    await pool.query('INSERT INTO clientes SET ?',[newlink]);
    res.redirect('/clientes');
})





//borrar un cliente
router.get('/delete/:id',async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM clientes where id_pdv = ?',[id]);
    res.redirect('/clientes');
 })
//editar un cliente

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM clientes WHERE id_pdv=?', [id]);
    res.render('catalogos/editCtes', {links: links[0]}); 
})


router.post('/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre_pdv, direccion, latitud, longitud} = req.body;
    const newlink ={
        nombre_pdv,
        direccion,
        latitud, 
        longitud
    };
    await pool.query('UPDATE clientes set ? WHERE id_pdv= ?',[newlink,id]);
    res.redirect('/clientes');
});

module.exports = router;