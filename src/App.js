import { Console } from '@woowacourse/mission-utils';
import ValidationError from './errors/validation-error.js';

class App {
  async run() {
    // 자동차 이름
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
      const input = await Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
      );
      const trimmedInput = input.trim();
      readInput(trimmedInput);

      // 시도
      const input2 = await Console.readLineAsync(
        '시도할 횟수는 몇 회인가요?\n'
      );
      const trimmedInput2 = input2.trim();
      readAttemptInput(trimmedInput2);
    } catch (error) {
      throw error;
    }
  }
}

export default App;
