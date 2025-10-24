import ValidationError from './errors/validation-error.js';
import InputService from './input/input-service.js';
import CarNameValidation from './validation/car-name-validation-service.js';

class App {
  async run() {
    const readAttemptInput = (input) => {
      const numInput = Number(input);
      if (input.length === 0 || Number.isNaN(numInput)) {
        throw new ValidationError('NOT_MATCHED_TYPE');
      }
      if (!(numInput >= 1 && numInput <= 100)) {
        throw new ValidationError('NOT_SATISFIED_ATTEMPT_COUNT');
      }
    };
    try {
      const carInput = await InputService.carNameInput();
      CarNameValidation.carNameValidation(carInput);
      // // 시도
      // const input2 = await Console.readLineAsync(
      //   '시도할 횟수는 몇 회인가요?\n'
      // );
      // const trimmedInput2 = input2.trim();
      // readAttemptInput(trimmedInput2);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
