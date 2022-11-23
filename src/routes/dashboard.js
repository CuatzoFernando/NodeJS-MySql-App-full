const express = require('express');
const router = express.Router();
const pool = require('../database');

//creando las rutas disponibles

router.get('/',async (req,res)=>{
      res.render('links/edit')
})





module.exports = router;