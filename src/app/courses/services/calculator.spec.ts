import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  it('should add 2 numbers', () => {
    // Step 1 - setup
    const logger = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(logger);

    // Step 2 - Act
    const result = calculator.add(2, 4);

    // Step 3 - Assert
    expect(result).toEqual(6);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    // Step 1 - setup
    const logger = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(logger);

    // Step 2 - Act
    const result = calculator.subtract(12, 4);

    // Step 3 - Assert
    expect(result).toEqual(8);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
});
