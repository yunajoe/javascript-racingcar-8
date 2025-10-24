import ValidationError from '../errors/validation-error.js';

class AttemptValidationService {
  static checkVacantAttempt(input) {
    if (input.length === 0) {
      throw new ValidationError('NOT_ALLOWED_VACANT');
    }
  }

  static checkValidType(input) {
    if (Number.isNaN(input)) {
      throw new ValidationError('NOT_MATCHED_TYPE');
    }
  }

  static checkAttemptCount(input) {
    if (!(input >= 1 && input <= 100)) {
      throw new ValidationError('NOT_SATISFIED_ATTEMPT_COUNT');
    }
  }

  static attemptValidation(input) {
    this.checkVacantAttempt(input);
    const numInput = Number(input);
    this.checkValidType(numInput);
    this.checkAttemptCount(numInput);
  }
}

export default AttemptValidationService;
