
// un objeto literal con las acciones para cada ruta
const mainController = {
    home: function(req, res){
        res.render("product-detail");
    }
}   
// Acá exportamos el objeto mainController
module.exports = mainController;