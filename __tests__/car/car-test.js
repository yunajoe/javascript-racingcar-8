import Car from '../../src/car/car-model.js';

describe('Car 클래스', () => {
  describe('정상 처리', () => {
    test('carNameList와 attemptCount모두 입력', () => {
      const carNames = ['car1', 'car2', 'car3'];
      const attempts = 5;

      const car = new Car(carNames, attempts);

      expect(car.carNameList).toEqual(carNames);
      expect(car.attemptCount).toBe(attempts);
    });
  });
  describe('예외 처리', () => {
    test.each(['', '12345', {}])(
      '자동차 반환 타입이 array가 아닐경우',
      (carNames) => {
        const attempts = 5;
        expect(() => new Car(carNames, attempts)).toThrow(
          '[ERROR] 유효한 자동차 타입이 아닙니다.'
        );
      }
    );
    test.each([[[]], [['car1']]])('자동차 갯수가 적을경우', (carNames) => {
      const attempts = 5;
      expect(() => new Car(carNames, attempts)).toThrow(
        '[ERROR] 자동차이름 갯수는 최소 2개 이상 10개이하로 작성해야 합니다.'
      );
    });
    test.each([0, 101])('시도 횟수가 1와 100사이가 아닌경우', (attempts) => {
      const carNames = ['car1', 'car2', 'car3'];
      expect(() => new Car(carNames, attempts)).toThrow(
        '[ERROR] 시도 횟수는 1번 이상으로 100번 이하로 작성해야 합니다.'
      );
    });
  });
});
