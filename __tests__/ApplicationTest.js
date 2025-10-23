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
    test.each([
      [['', '1']],
      [['       ', '1']],
      [['abc, abdefgh', '1']],
      [['abc,', '1']],
    ])('%s', async (inputs) => {
      mockQuestions(inputs);
      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 자동차 이름은 1글자이상 5글자 이하로 작성해야합니다.'
      );
    });
    test.each([[['abc, abce   fgg', '1']]])('%s', async (inputs) => {
      mockQuestions(inputs);
      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 자동차 이름에 공백은 허용이 안됩니다.'
      );
    });
    test.each([[['car', '1']], [['car@', '1']]])('%s', async (inputs) => {
      mockQuestions(inputs);
      const app = new App();
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 자동차이름 갯수는 최소 2개 이상 사용해야 합니다.'
      );
    });
    test.each([[['car,car', '1']], [['car,yuna,car', '1']]])(
      '%s',
      async (inputs) => {
        mockQuestions(inputs);
        const app = new App();
        await expect(app.run()).rejects.toThrow(
          '[ERROR] 자동차 이름은 중복될 수 없습니다.'
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
