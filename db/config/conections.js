const connectConfig = {
  mariaDB: {
    client: "mysql",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "ecommerce",
    },
  },
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: `./db/mensajes.sqlite`,
    },
    useNullAsDefault: true,
  },
};

module.exports = connectConfig;
