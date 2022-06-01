// Librerias
const knex = require(`knex`);

// Clase constructor
class Container {
  constructor(options, tableName) {
    this.knex = knex(options);
    this.tableName = tableName;
  }

  //   crea una tabla, en caso de que exista la limpia
  createTable() {
    return this.knex.schema.dropTableIfExists(this.tableName).finally(() => {
      return this.knex.schema.createTable(this.tableName, (table) => {
        table.increments(`id`).primary();
        table.string(`title`, 25).notNullable();
        table.float(`price`);
        table.string(`thumbnail`, 240).notNullable();
      });
    });
  }

  save(object) {
    return this.knex.insert(object).into(this.tableName);
  }

  modify(id, object) {
    return this.knex.from(this.tableName).where(`id`, id).update(object);
  }

  getById(id) {
    try {
      return this.knex.from(this.tableName).select(`*`).where(`id`, id);
    } catch (error) {
      throw new Error(`Error al leer la tabla: ${error}`);
    }
  }

  getRandom() {
    const randomElement = Math.floor(Math.random() * this.fileContent.length);
    return this.knex
      .from(this.tableName)
      .select(`*`)
      .where(`id`, randomElement);
  }

  getAll() {
    try {
      return this.knex(this.tableName).select(`*`);
    } catch (error) {
      throw new Error(`Error al leer la tabla: ${error}`);
    }
  }

  deleteById(id) {
    return this.knex.from(this.tableName).where(`id`, id).del();
  }

  deleteAll() {
    return this.knex(this.tableName).select(`*`).del();
  }

  close() {
    this.knex.destroy();
  }
}

module.exports = Container;
