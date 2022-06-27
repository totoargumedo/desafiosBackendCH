import { faker } from "@faker-js/faker";
faker.locale = "es";

function generateMessage() {
  return {
    author: {
      email: faker.internet.email(),
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      edad: faker.random.numeric(2),
      alias: faker.random.word(),
      avatar: faker.image.avatar(),
    },
    text: faker.random.words(48),
  };
}

export { generateMessage };
