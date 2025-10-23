import { Console } from '@woowacourse/mission-utils';
import ValidationError from './errors/validation-error.js';

class App {
  async run() {
    const readInput = (input) => {
      if (input.length === 0) {
        throw new ValidationError('NOT_SATISFIED_PROPER_NAME');
      }

      const splitInput = input.split(',');
      if (splitInput.length <= 1) {
        throw new ValidationError('NOT_SATISFIED_NUMBER_OF_CAR');
      }

      const trimmedArr = splitInput.map((input) => input.trim());

      const setArray = Array.from([...new Set(trimmedArr)]);
      if (trimmedArr.length !== setArray.length) {
        throw new ValidationError('DUPLICATED_NAME');
      }

      const regex = /\s/;
      trimmedArr.forEach((input) => {
        const isBlankInclude = regex.test(input);
        if (isBlankInclude) {
          throw new ValidationError('NOT_ALLOWED_NAME');
        }
        if (!(input.length >= 1 && input.length <= 5)) {
          throw new ValidationError('NOT_SATISFIED_PROPER_NAME');
        }
      });
      return trimmedArr;
    };
    try {
      const input = await Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
      );
      const trimmedInput = input.trim();
      readInput(trimmedInput);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
