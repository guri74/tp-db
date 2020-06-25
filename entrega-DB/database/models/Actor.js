module.exports = function(sequelize, dataTypes){
    var alias ="Actor";
    var cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING

        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        genre_id:{
            type: dataTypes.INTEGER
        }
    }
    var config = {
        tableName: "actors",
        timestamps: false
    }
    var Actor = sequelize.define(alias, cols, config);
    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie,{
            as: "movies",
            through: "actor_movie",
            foreignKey:"actor_id",
            otherKey:"movie_id",
            timestamps: false
        })
    }
    return Actor;
}