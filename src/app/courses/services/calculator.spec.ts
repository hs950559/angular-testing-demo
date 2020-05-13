import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let logger: any;
  let calculator: any;

  beforeEach(() => {
    logger = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: logger
        }
      ]
    });

    calculator = TestBed.get(CalculatorService);
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
