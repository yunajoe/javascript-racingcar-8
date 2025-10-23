const errorProperties = {
  NOT_SATISFIED_MIN_LENGTH:
    '[ERROR] 최소 2개 이상의 자동차 이름을 입력해야합니다.',
  NOT_SATISFIED_PROPER_NAME:
    '[ERROR] 자동차 이름 길이가 5자 초과나 이름 사이에 공백이 올수는 없습니다.',
};

class ValidationError extends Error {
  constructor(property) {
    super(errorProperties[property]);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
