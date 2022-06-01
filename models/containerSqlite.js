const knex = require(`knex`);

class ClienteSQL {
  constructor(options, tableName) {
    this.knex = knex(options);
    this.tableName = tableName;
    this.createTable();
  }

  createTable() {
    return this.knex.schema.dropTableIfExists(this.tableName).finally(() => {
      return this.knex.schema.createTable(this.tableName, (table) => {
        table.increments(`id`).primary();
        table.string(`name`, 25).notNullable();
        table.string(`message`, 140).notNullable();
      });
    });
  }

  // se utiliza async porque los mensajes deben tener un orden correspondiente?
  async insertIntoTable(newRegister) {
    try {
      return this.knex(this.tableName).insert(newRegister);
    } catch (error) {
      throw new Error(`Error al cargar: ${error}`);
    }
  }

  listContent() {
    try {
      return this.knex(this.tableName).select(`*`);
    } catch (error) {
      throw new Error(`Error al leer la tabla: ${error}`);
    }
  }

  close() {
    this.knex.destroy();
  }
}

module.exports = ClienteSQL;
