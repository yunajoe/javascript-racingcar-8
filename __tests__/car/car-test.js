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
  describe('예외 처린', () => {
    test('carNameList가 입력되지 않은 경우', () => {
      const carNames = [];
      const attempts = 5;
      const car = new Car(carNames, attempts);
      expect(car).toTrow('[ERROR]');
    });
    test('시도횟수가 입력되지 않은 경우', () => {
      const carNames = ['car1', 'car2', 'car3'];
      const attempts = '';
      const car = new Car(carNames, attempts);
      expect(car).toTrow('[ERROR]');
    });
    test.each([0, 101])('시도 횟수가 %i일 때 [ERROR] 발생', (attempts) => {
      const carNames = ['car1', 'car2', 'car3'];
      expect(() => new Car(carNames, attempts)).toThrow('[ERROR]');
    });
  });
});
