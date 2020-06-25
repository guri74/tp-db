const fs = require('fs');
var db = require('../database/models');
const { title } = require('process');
var sequelize = db.sequelize; 

const moviesController = {
    create: (req,res) =>{
        db.Genre.findAll()
            .then(data => {
                var genre = data;
                return res.render('movies-create',{genre})
            });
            
    },
    store: (req,res) =>{
        db.Movie.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        })
        res.redirect('/movies/create');
    },

    showMovies: function(req,res){
        db.Movie.findAll()
        .then(function(movies) {
            res.render("movies-all", {movies:movies});
        })
    },
    detail: function(req,res){
        db.Movie.findByPk(req.params.id,
            {include: [{association: "genre"}, {association: "actors"}]
        })
        .then(function(movie){
            return  res.render("movies-detail",{movie:movie})
        })
    },
    edit: function(req,res){
        //pedir datos de la pelicula a editar
        let reqMovie = db.Movie.findByPk(req.params.id);
        //pedir todos los generos para que el usuario pueda elegir el género de la película
        let reqMovieGenre = db.Genre.findAll();
        
        Promise.all([reqMovie,reqMovieGenre])
        .then(function([movie,genre]){
            res.render("movies-edit", {movie:movie, genre:genre})
        }
    },
    update: function(req,res){
        db.Movie.update({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        },{
            where: {
                id: req.params.id
            }
        });
        res.redirect('/movies/'+req.params.id);
    },
    delete: function(req,res){
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies')
    }
}
module.exports = moviesController;