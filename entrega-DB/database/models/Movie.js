module.exports = function(sequelize, dataTypes){
    var alias = "Movie"
    var cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING

        },
        awards: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id:{
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    }
    var config = {
        tableName: "movies",
        timestamps: false
    }
    var Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,
            {
                as:"genre",
                foreignKey:"genre_id"
        }),
        Movie.belongsToMany(models.Genre,{
            as: "actors",
            through: "actor_movie",
            foreignKey:"movie_id",
            otherKey:"actor_id",
            timestamps: false
        })
    };
    return Movie;
}