import { Console } from '@woowacourse/mission-utils';

class InputService {
  static trimmedInput(input) {
    return input.trim();
  }

  static async readInput(input) {
    const result = await Console.readLineAsync(input);
    return this.trimmedInput(result);
  }

  static async carNameInput() {
    const result = await this.readInput(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
    );
    return result;
  }

  static async attemptInput() {
    const result = await this.readInput('시도할 횟수는 몇 회인가요?\n');
    return result;
  }
}

export default InputService;
