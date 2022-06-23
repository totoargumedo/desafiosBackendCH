import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateMessage() {
  return {
    author: {
      id: faker.internet.email(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      edad: faker.random.numeric(2),
      alias: faker.random.word(),
      avatar: faker.image.avatar(),
    },
    text: faker.random.words(8),
  };
}

export { generateMessage };
