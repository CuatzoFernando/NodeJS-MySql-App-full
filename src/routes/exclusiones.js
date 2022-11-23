const express = require('express');
const router = express.Router();
const pool = require('../database');

//creando las rutas disponibles

//lista de todos los clientes
router.get('/',async (req,res)=>{
    const links = await pool.query('Select * from exclusiones');
    res.render('catalogos/listaExclusiones',{links})
})
//agregar un nuevo cliente
router.get('/add', (req, res)=>{
    res.render('catalogos/addExclusiones');
})


router.post('/add', async (req, res)=>{
    const {nombre_pdv, direccion, latitud, longitud} = req.body;
    const newlink =  {
        nombre_pdv,
       direccion,
       latitud,
       longitud
       
    };
    await pool.query('INSERT INTO exclusiones SET ?',[newlink]);
    res.redirect('/exclusiones');
})





//borrar un cliente
router.get('/delete/:id',async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM exclusiones where id_pdv = ?',[id]);
    res.redirect('/exclusiones');
 })
//editar un cliente

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM exclusiones WHERE id_pdv=?', [id]);
    res.render('catalogos/editExclusiones', {links: links[0]}); 
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
    await pool.query('UPDATE exclusiones set ? WHERE id_pdv= ?',[newlink,id]);
    res.redirect('/exclusiones');
});

module.exports = router;