module.exports = function(sequelize, dataTypes){
    var alias = "Genre";

    var cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING

        }
    }
    var config = {
        tableName: "genres",
        timestamps: false
    }
    var Genre = sequelize.define(alias, cols, config);
    Genre.associate = function(models){
        Genre.hasMany(models.Movie,{
            as: "movies",
            foreignKey:"genre_id",
        })
    }
    return Genre;
}