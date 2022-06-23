import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateProduct() {
  return {
    _id: faker.database.mongodbObjectId(),
    nombre: faker.commerce.product(),
    descripcion: faker.commerce.productDescription(),
    codigo: faker.random.alphaNumeric(6),
    foto: faker.image.cats(640, 640, true),
    precio: faker.random.numeric(4),
    stock: faker.random.numeric(2),
    timestamp: faker.date.past(),
  };
}
export { generateProduct };
