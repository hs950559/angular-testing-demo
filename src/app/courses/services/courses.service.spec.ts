import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { COURSES } from '../../../../server/db-data';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let testingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.get(CoursesService);
    testingController = TestBed.get(HttpTestingController);
  });

  it('should retreive all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses.length).toBe(12);

        const course = courses[1];
        expect(course.category).toEqual('BEGINNER');
        expect(course.titles.description).toEqual('Angular Core Deep Dive');


      });

    const req = testingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({ payload: Object.values(COURSES) });
  });

  it('Should get one course by id', () => {
    coursesService.findCourseById(12)
      .subscribe(course => {
        console.log('HEMANT', course);
        expect(course).toBeDefined();
        expect(course.titles.description).toEqual('Angular Testing Course');
      });

    const req = testingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });

  afterEach(() => {
    // to make sure only one http call in each it block
    testingController.verify();
  });
});
