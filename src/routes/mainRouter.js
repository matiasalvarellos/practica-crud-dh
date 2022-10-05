const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.home);
router.get("/prueba", function(req, res){
    if(req.session.usuarioLogueado){
        res.send(req.session.usuarioLogueado.name)
    }else{
        res.send("usuario no se encuentra en sesion")
    }
});


module.exports = router