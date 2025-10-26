import { Console, MissionUtils } from '@woowacourse/mission-utils';
import CarService from '../../src/car/car-service.js';

jest.mock('@woowacourse/mission-utils', () => ({
  MissionUtils: {
    Random: {
      pickNumberInRange: jest.fn(),
    },
  },
  Console: {
    print: jest.fn(),
  },
}));

describe('Car Service 모듈 테스트', () => {
  let carService;

  beforeEach(() => {
    jest.clearAllMocks();
    carService = new CarService();
  });
  describe('makeRaceObject()', () => {
    test('시도 횟수만큼 랜덤값을 생성한다.', () => {
      const car = { carNameList: ['car1', 'car2'], attemptCount: 2 };
      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(6);

      const result = carService.makeRaceObject(car);

      expect(result).toEqual([
        { car1: 4, car2: 7 },
        { car1: 3, car2: 6 },
      ]);
      expect(MissionUtils.Random.pickNumberInRange).toHaveBeenCalledTimes(4);
    });
  });
  describe('calculateRaceProcedure()', () => {
    test('랜덤값이 4 이상일 때만 "-"를 추가한다.', () => {
      const input = [
        { car1: 4, car2: 2 },
        { car1: 5, car2: 9 },
      ];
      const result = carService.calculateRaceProcedure(input);

      expect(result).toEqual([
        { car1: '-', car2: '' },
        { car1: '--', car2: '-' },
      ]);
    });
  });
  describe('printRacingResult()', () => {
    test('결과를 콘솔에 출력한다.', () => {
      const outputArr = [{ car1: '--', car2: '-' }];
      carService.printRacingResult(outputArr);

      expect(Console.print).toHaveBeenCalledWith('실행 결과');
      expect(Console.print).toHaveBeenCalledWith('car1 : --');
      expect(Console.print).toHaveBeenCalledWith('car2 : -');
    });
  });

  describe('printWinner()', () => {
    test('최종 우승자를 콘솔에 출력한다. (단일 우승자)', () => {
      const outputArr = [
        { car1: '-', car2: '' },
        { car1: '--', car2: '-' },
      ];
      carService.printWinner(outputArr);
      expect(Console.print).toHaveBeenCalledWith('최종 우승자 : car1');
    });

    test('공동 우승자일 경우, 이름을 쉼표로 구분해 출력한다.', () => {
      const outputArr = [
        { car1: '-', car2: '-' },
        { car1: '--', car2: '--' },
      ];
      carService.printWinner(outputArr);
      expect(Console.print).toHaveBeenCalledWith('최종 우승자 : car1, car2');
    });
  });
});
