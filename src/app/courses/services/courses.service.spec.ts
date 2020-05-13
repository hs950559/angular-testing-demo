import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpTestingController],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.get(CoursesService);
  });

  it('should retreive all courses', () => {

  });
});
