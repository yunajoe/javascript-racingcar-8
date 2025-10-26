import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('helper 함수 테스팅', () => {
  test('mockQuestion 함수 => promise.resolve를 반환', async () => {
    mockQuestions(['hello']);
    const result = await MissionUtils.Console.readLineAsync();
    expect(result).toBe('hello');
  });
  test('mockRandom 함수 => random값 반환', async () => {
    mockRandoms([1, 3, 5]);
    expect(MissionUtils.Random.pickNumberInRange()).toBe(1);
    expect(MissionUtils.Random.pickNumberInRange()).toBe(3);
    expect(MissionUtils.Random.pickNumberInRange()).toBe(5);
  });
  test('getLogSpy함수 => 메시지 출력', async () => {
    const logSpy = getLogSpy();
    MissionUtils.Console.print('getLogSpy함수');
    expect(logSpy).toHaveBeenCalledWith('getLogSpy함수');
  });
});

export { getLogSpy, mockQuestions, mockRandoms };
