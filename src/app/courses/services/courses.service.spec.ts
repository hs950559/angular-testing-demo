import { Course } from './../model/course';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { COURSES, findLessonsForCourse } from '../../../../server/db-data';
import { HttpErrorResponse } from '@angular/common/http';

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
        expect(course).toBeDefined();
        expect(course.titles.description).toEqual('Angular Testing Course');
      });

    const req = testingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });

  it('Should update one course', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'MY Updated Title'
      }
    };

    coursesService.saveCourse(12, changes)
      .subscribe(course => {
        expect(course.id).toEqual(12);
        expect(course.titles.description).toEqual('MY Updated Title');
      });

    const req = testingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush({
      ...COURSES[12],
      ...changes
    });
  });

  it('should give error if couse save failed', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'MY Updated Title'
      }
    };

    coursesService.saveCourse(12, changes)
      .subscribe(course =>
        () => fail('Update should have failed'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(500);
        }
      );

    const req = testingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    req.flush(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  it('should find all lessons for a course', () => {
    coursesService.findLessons(12)
      .subscribe(lessons => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
      });

    const req = testingController.expectOne(r => r.url === '/api/lessons');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });
  });

  afterEach(() => {
    // to make sure only one http call in each it block
    testingController.verify();
  });
});
