import InputService from './input/input-service.js';
import AttemptValidationService from './validation/attempt-validation-service.js';
import CarNameValidation from './validation/car-name-validation-service.js';

class App {
  async run() {
    try {
      const carInput = await InputService.carNameInput();
      CarNameValidation.carNameValidation(carInput);
      const attemptInput = await InputService.attemptInput();
      AttemptValidationService.attemptValidation(attemptInput);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
