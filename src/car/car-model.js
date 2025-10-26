import ValidationError from '../errors/validation-error.js';

class Car {
  constructor(carNameList, attemptCount) {
    this.validate(carNameList, attemptCount);
    this.carNameList = carNameList;
    this.attemptCount = attemptCount;
  }

  validate(carNameList, attemptCount) {
    if (!Array.isArray(carNameList)) {
      throw new ValidationError('NOT_MATCHED_CAR_TYPE');
    }
    if (carNameList.length <= 1) {
      throw new ValidationError('NOT_SATISFIED_NUMBER_OF_CAR');
    }
    if (!(attemptCount >= 1 && attemptCount <= 100)) {
      throw new ValidationError('NOT_SATISFIED_ATTEMPT_COUNT');
    }
  }
}
export default Car;
