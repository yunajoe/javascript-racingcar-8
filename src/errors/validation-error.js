const errorProperties = {
  NOT_ALLOWED_VACANT: '[ERROR] 빈 문자열은 허용이 안됩니다.',
  NOT_SATISFIED_PROPER_LENGTH:
    '[ERROR] 자동차 이름은 1글자이상 5글자 이하로 작성해야합니다.',
  NOT_SATISFIED_NUMBER_OF_CAR:
    '[ERROR] 자동차이름 갯수는 최소 2개 이상 사용해야 합니다.',
  NOT_ALLOWED_CHAR: '[ERROR] 자동차 이름에 공백은 허용이 안됩니다.',
  DUPLICATED_NAME: '[ERROR] 자동차 이름은 중복될 수 없습니다.',
  NOT_MATCHED_TYPE: '[ERROR] 시도 횟수는 숫자 타입만 허용이 됩니다.',
  NOT_SATISFIED_ATTEMPT_COUNT:
    '[ERROR] 시도 횟수는 1번 이상으로 100번 이하로 작성해야 합니다.',
};

class ValidationError extends Error {
  constructor(property) {
    super(errorProperties[property]);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
