import { Console } from '@woowacourse/mission-utils';
import ValidationError from './errors/validation-error.js';

class App {
  async run() {
    try {
      const input = await Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
      );
      const trimmedInput = input.trim();
      if (trimmedInput.length === 0) {
        throw new ValidationError('NOT_SATISFIED_MIN_LENGTH');
      }
      const splitInput = trimmedInput.split(',');
      if (splitInput.length <= 1) {
        throw new ValidationError('NOT_SATISFIED_MIN_LENGTH');
      }

      const regex = /\s/;

      splitInput.forEach((input) => {
        const trimmedInput = input.trim();
        const isBlankInclude = regex.test(trimmedInput);
        if (trimmedInput.length > 5) {
          throw new ValidationError('NOT_SATISFIED_PROPER_NAME');
        }
        if (isBlankInclude) {
          throw new ValidationError('NOT_SATISFIED_PROPER_NAME');
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default App;
