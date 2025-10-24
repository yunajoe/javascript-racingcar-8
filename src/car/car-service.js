import { Console, MissionUtils } from '@woowacourse/mission-utils';
import Car from './car-model.js';

class CarService {
  race(car) {
    try {
      const result = [];
      if (car instanceof Car) {
        const { carNameList, attemptCount } = car;
        for (let i = 0; i < attemptCount; i++) {
          const obj = {};
          for (const car of carNameList) {
            const randomNum = MissionUtils.Random.pickNumberInRange(0, 9);
            obj[car] = randomNum;
          }
          result.push(obj);
        }

        this.printResult(result);
      }
    } catch (error) {
      throw error;
    }
  }

  printResult(result) {
    Console.print('\n');
    Console.print('실행 결과');
    const outputArr = [];
    while (result.length > 0) {
      const obj = result.shift();
      if (outputArr.length === 0) {
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
          if (!newObj[key]) {
            newObj[key] = '';
          }
          if (value >= 4) {
            newObj[key] += '-';
          }
        }
        outputArr.push(newObj);
      } else {
        const resultObj = outputArr.slice(-1)[0];
        const newObj = { ...resultObj };
        for (const [key, value] of Object.entries(obj)) {
          if (value >= 4) {
            newObj[key] += '-';
          }
        }
        outputArr.push(newObj);
      }
    }

    outputArr.forEach((output) => {
      for (const [key, value] of Object.entries(output)) {
        Console.print(`${key} : ${value}`);
      }
      Console.print('\n');
    });
  }
}

export default CarService;
