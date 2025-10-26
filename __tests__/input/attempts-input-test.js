import App from '../../src/App';
import { mockQuestions } from '../helper';

describe('시도할 횟수 입력 예외 테스트', () => {
  let app;
  beforeEach(() => {
    app = new App();
  });
  test.each([[['car1,car2', '']], [['car1,car2', '        ']]])(
    '%s',
    async (inputs) => {
      mockQuestions(inputs);
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 빈 문자열은 허용이 안됩니다.'
      );
    }
  );
  test.each([[['car1,car2', ',']], [['car1,car2', 'abc']]])(
    '%s',
    async (inputs) => {
      mockQuestions(inputs);
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 시도 횟수는 숫자 타입만 허용이 됩니다.'
      );
    }
  );
  test.each([[['car1,car2', '0']], [['car1,car2', '9007199254740991']]])(
    '%s',
    async (inputs) => {
      mockQuestions(inputs);
      await expect(app.run()).rejects.toThrow(
        '[ERROR] 시도 횟수는 1번 이상으로 100번 이하로 작성해야 합니다.'
      );
    }
  );
});
