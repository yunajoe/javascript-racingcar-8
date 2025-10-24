import { carNameRegex } from '../const/validation.js';
import ValidationError from '../errors/validation-error.js';

class CarNameValidation {
  static checkVacantName(input) {
    if (input.length === 0) {
      throw new ValidationError('NOT_ALLOWED_VACANT');
    }
  }

  static checkNameLength(input) {
    if (!(input.length >= 1 && input.length <= 5)) {
      throw new ValidationError('NOT_SATISFIED_PROPER_LENGTH');
    }
  }

  static checkNumberOfCarName(input) {
    const splitInput = input.split(',').filter((item) => item.trim());
    if (splitInput.length <= 1) {
      throw new ValidationError('NOT_SATISFIED_NUMBER_OF_CAR');
    }
    return splitInput;
  }

  static checkDuplicatedName(inputArr) {
    const setArray = Array.from([...new Set(inputArr)]);
    if (inputArr.length !== setArray.length) {
      throw new ValidationError('DUPLICATED_NAME');
    }
    return inputArr;
  }

  static checkContainNotAllowedChar(input) {
    const isNotAllowedCharContain = carNameRegex.test(input);
    if (isNotAllowedCharContain) {
      throw new ValidationError('NOT_ALLOWED_CHAR');
    }
  }

  static carNameValidation(input) {
    this.checkVacantName(input);
    const splitInput = this.checkNumberOfCarName(input);
    const inputArr = this.checkDuplicatedName(splitInput);
    inputArr.forEach((input) => {
      this.checkContainNotAllowedChar(input);
      this.checkNameLength(input);
    });
  }
}

export default CarNameValidation;
