class ValidationError extends Error {
  constructor(property) {
    super(errorProperties[property]);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
