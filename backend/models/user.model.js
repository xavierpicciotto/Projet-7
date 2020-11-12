module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      user_password: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };