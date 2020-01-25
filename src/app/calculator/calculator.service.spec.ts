import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });

    calculatorService = TestBed.get(CalculatorService);
  });

  it('should be created', () => {
    expect(calculatorService).toBeTruthy();
  });

  it('should add 2 numbers', () => {
    const result = calculatorService.add(2, 3);
    // expect(result).toBe(54, 'error in addition');
    expect(result).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
