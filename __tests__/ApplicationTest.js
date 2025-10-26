import App from '../src/App.js';
import { getLogSpy, mockQuestions, mockRandoms } from './helper/index.js';

describe('자동차 경주', () => {
  describe('통합테스트 - 자동차 경주 결과', () => {
    test('우승자가 한명일 경우 - 시도 횟수를 1번 했을 경우', async () => {
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
    test('우승자가 한명일 경우 - 시도 횟수 2번 이상했을 경우', async () => {
      // given
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ['pobi,woni', '2'];
      const logs = [
        'pobi : -',
        'woni : ',
        'pobi : --',
        'woni : -',
        '최종 우승자 : pobi',
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms([MOVING_FORWARD, STOP, MOVING_FORWARD, MOVING_FORWARD]);

      // when
      const app = new App();
      await app.run();

      // then
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
    test('우승자가 2명이상일 경우', async () => {
      const MOVING_FORWARD = 5;
      const STOP = 0;
      const inputs = ['car1,car2,car3', '2'];
      const logs = [
        'car1 : -',
        'car2 : -',
        'car3 : ',
        'car1 : --',
        'car2 : --',
        'car3 : -',
        '최종 우승자 : car1, car2',
      ];

      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms([
        MOVING_FORWARD,
        MOVING_FORWARD,
        STOP,
        MOVING_FORWARD,
        MOVING_FORWARD,
        MOVING_FORWARD,
      ]);

      const app = new App();
      await app.run();
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
  });
  describe('통합테스트 - 예외처리 ', () => {
    test('시도횟수를 적지 않은 경우', async () => {
      // given
      const inputs = ['pobi,javaji'];
      mockQuestions(inputs);
      // when
      const app = new App();
      // then
      await expect(app.run()).rejects.toThrow('[ERROR]');
    });
  });
});
