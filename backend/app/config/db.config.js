module.exports = {
  HOST: "localhost",
  USER: "groupomania_admin",
  PASSWORD: "admin",
  DB: "groupomania_network",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
