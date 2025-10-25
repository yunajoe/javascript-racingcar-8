import { Console, MissionUtils } from '@woowacourse/mission-utils';
import Car from './car-model.js';

class CarService {
  /**
   * 시도 횟수 만큼 자동차의 랜덤 결과값 생성
   * [ { a: 4, b: 7, c: 3 }, { a: 4, b: 7, c: 6 } ]
   */
  makeRaceObject(car) {
    const { carNameList, attemptCount } = car;
    return Array.from({ length: attemptCount }, () => {
      return Object.fromEntries(
        carNameList.map((car) => [
          car,
          MissionUtils.Random.pickNumberInRange(0, 9),
        ])
      );
    });
  }

  /**
   *
   * 랜던값을 기준으로 자동차의 진행상황 결과값 생성
   * [ { a: '', b: '-', c: '-' }, { a: '-', b: '-', c: '-' } ]
   */

  calculateRaceProcedure(result) {
    return result.reduce((acc, obj) => {
      const recentObject =
        acc.at(-1) ||
        Object.fromEntries(Object.keys(obj).map((key) => [key, '']));
      const raceObject = Object.fromEntries(
        Object.entries(obj).map((item) => {
          const [key, value] = item;
          let newValue = recentObject[key];
          if (value >= 4) {
            newValue += '-';
          }
          return [key, newValue];
        })
      );
      const newAcc = [...acc, raceObject];
      return newAcc;
    }, []);
  }

  printRacingResult(outputArr) {
    Console.print('\n');
    Console.print('실행 결과');

    outputArr.forEach((output) => {
      for (const [key, value] of Object.entries(output)) {
        Console.print(`${key} : ${value}`);
      }
      Console.print('\n');
    });
  }

  printWinner(outputArr) {
    const finalRace = outputArr.at(-1);
    const maxValue = Math.max(
      ...Object.values(finalRace).map((value) => value.length)
    );
    const winnerNames = Object.entries(finalRace)
      .filter(([, value]) => {
        return value.length === maxValue;
      })
      .map(([key]) => key);

    Console.print(`최종 우승자 : ${winnerNames.join(', ')}`);
  }

  race(car) {
    if (!(car instanceof Car)) return;
    const result = this.makeRaceObject(car);
    const outputArr = this.calculateRaceProcedure(result);
    this.printRacingResult(outputArr);
    this.printWinner(outputArr);
  }
}

export default CarService;
