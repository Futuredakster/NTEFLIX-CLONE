module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
       user_id: {
         autoIncrement: true,
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
       },
       username: {
         type: DataTypes.STRING(50),
         allowNull: false
       },
       password_hash: {
         type: DataTypes.STRING(255),
         allowNull: false
       },
       movie_id: {
        type: DataTypes.INTEGER,
        allowNull: true  // Set to false if a user must always have a movie_id
      }
     });
     return users;
   };
   