import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  it('should add 2 numbers', () => {
    // Step 1 - setup
    const calculator = new CalculatorService(new LoggerService());

    // Step 2 - Act
    const result = calculator.add(2, 4);

    // Step 3 - Assert
    expect(result).toEqual(6);
  });

  it('should subtract 2 numbers', () => {
    // Step 1 - setup
    const calculator = new CalculatorService(new LoggerService());

    // Step 2 - Act
    const result = calculator.subtract(10, 5);

    // Step 3 - Assert
    expect(result).toEqual(5);
  });
});
