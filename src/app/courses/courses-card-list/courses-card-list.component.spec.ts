import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';

describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule
      ],
      declarations: [
        CoursesCardListComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });


  it('should display the course list', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(12);
  });


  it('should display the first course', () => {

    pending();

  });


});

