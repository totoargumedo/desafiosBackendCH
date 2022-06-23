import { generateProduct } from "../utils/productsGenerator.js";

class ApiProductsMock {
  constructor() {}

  populate(quantity = 5) {
    const newElements = [];
    for (let i = 0; i < quantity; i++) {
      newElements.push(generateProduct());
    }
    return newElements;
  }
}

export default ApiProductsMock;
