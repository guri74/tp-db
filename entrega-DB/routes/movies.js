var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET movies listing. */
    // Listado de todas las películas -{lectura}-
router.get('/', moviesController.showMovies);
    // tomo los datos para crear una nueva peli
router.get('/create',moviesController.create);
    //recibo - guardo y escribo en db -{escritura}-
router.post('/create',moviesController.store);
    //muestra el form completo con datos de la pelicula a editar (indicada por el ID)

    //selección de película para editar - {detalle} -
router.get('/:id',moviesController.detail);
    // Actualizar película -{update}-
router.get('/edit/:id',moviesController.edit);
    //actualiza la pelicula (escribir db)
router.post('/edit/:id',moviesController.update);
    //eliminar la pelicula de la db
router.post('/delete/:id',moviesController.delete);



module.exports = router;