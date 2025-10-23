import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../../src/App';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe('자동차 이름 입력 예외 테스트', () => {
  let app;
  beforeEach(() => {
    app = new App();
  });
  test.each([
    [['', '1']],
    [['       ', '1']],
    [['abc, abdefgh', '1']],
    [['abc,', '1']],
  ])('%s', async (inputs) => {
    mockQuestions(inputs);
    await expect(app.run()).rejects.toThrow(
      '[ERROR] 자동차 이름은 1글자이상 5글자 이하로 작성해야합니다.'
    );
  });
  test.each([[['abc, abce   fgg', '1']]])('%s', async (inputs) => {
    mockQuestions(inputs);
    await expect(app.run()).rejects.toThrow(
      '[ERROR] 자동차 이름에 공백은 허용이 안됩니다.'
    );
  });
  test.each([[['car', '1']], [['car@', '1']]])('%s', async (inputs) => {
    mockQuestions(inputs);
    await expect(app.run()).rejects.toThrow(
      '[ERROR] 자동차이름 갯수는 최소 2개 이상 사용해야 합니다.'
    );
  });
  test.each([[['car,car', '1']], [['car,yuna,car', '1']]])(
    '%s',
    async (inputs) => {
      mockQuestions(inputs);
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 자동차 이름은 중복될 수 없습니다.'
      );
    }
  );
});
