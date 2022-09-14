
// un objeto literal con las acciones para cada ruta
const mainController = {
    home: function(req, res){
        res.render("index");
    }
}   
// Acá exportamos el objeto mainController
module.exports = mainController;