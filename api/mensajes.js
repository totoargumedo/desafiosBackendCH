import { generateMessage } from "../utils/messageGenerator";

class ApiMessagesMock {
  constructor() {}

  populate(quantity = 5) {
    const newElements = [];
    for (let i = 0; i < quantity; i++) {
      newElements.push(generateProduct());
    }
    return newElements;
  }
}

export default ApiMessagesMock;
