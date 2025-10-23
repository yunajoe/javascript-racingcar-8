import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../../src/App';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('시도할 횟수 입력 예외 테스트', () => {
  let app;
  beforeEach(() => {
    app = new App();
  });
  test.each([
    [['car1,car2', '']],
    [['car1,car2', '   ']],
    [['car1,car2', ',']],
    [['car1,car2', 'abc']],
  ])('%s', async (inputs) => {
    mockQuestions(inputs);
    await expect(app.run()).rejects.toThrow(
      '[ERROR] 숫자만 입력할 수 있습니다.'
    );
  });
  test.each([[['car1,car2', '0']], [['car1,car2', '9007199254740991']]])(
    '%s',
    async (inputs) => {
      mockQuestions(inputs);
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 최소 1이상, 최대 9007199254740991 까지만 입력할 수 있습니다.'
      );
    }
  );
});
