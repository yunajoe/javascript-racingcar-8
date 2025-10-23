import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  describe('자동차 이름 입력 예외 테스트', () => {
    test.each([[['yuna', '1']], [['', '1']], [['       ', '1']]])(
      '%s',
      async (inputs) => {
        mockQuestions(inputs);
        const app = new App();
        await expect(app.run()).rejects.toThrow(
          '[ERROR] 최소 2개 이상의 자동차 이름을 입력해야합니다.'
        );
      }
    );
    test.each([[['abc, abdefgh', '1']], [['abc, abce   fgg', '1']]])(
      '%s',
      async (inputs) => {
        mockQuestions(inputs);
        const app = new App();
        await expect(app.run()).rejects.toThrow(
          '[ERROR] 자동차 이름 길이가 5자 초과나 이름 사이에 공백이 올수는 없습니다.'
        );
      }
    );
    test.each([[['car1@car2', '1']], [['car1 car2', '1']]])(
      '%s',
      async (inputs) => {
        mockQuestions(inputs);
        const app = new App();
        await expect(app.run()).rejects.toThrow(
          '[ERROR] 자동차 구분은 쉼표(,)만 허용이 됩니다.'
        );
      }
    );
  });
  test('예외 테스트', async () => {
    // given
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);
    // when
    const app = new App();
    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});
