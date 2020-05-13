import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let logger: any;
  let calculator: any;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(logger);
  });

  it('should add 2 numbers', () => {
    // Step 2 - Act
    const result = calculator.add(2, 4);

    // Step 3 - Assert
    expect(result).toEqual(6);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    // Step 2 - Act
    const result = calculator.subtract(12, 4);

    // Step 3 - Assert
    expect(result).toEqual(8);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
});
