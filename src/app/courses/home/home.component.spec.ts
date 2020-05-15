import { CoursesService } from './../services/courses.service';
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { COURSES } from '../../../../server/db-data';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let courseService: any;
  const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
    'findAllCourses',
  ]);
  const beginnerCourses = setupCourses().filter(
    (item) => item.category === 'BEGINNER'
  );
  const advancedCourses = setupCourses().filter(
    (item) => item.category === 'ADVANCED'
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceSpy,
        },
      ],
      declarations: [],
    });

    courseService = TestBed.get(CoursesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    courseService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });

  it('should display only advanced courses', () => {
    courseService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });

  it('should display both tabs', () => {
    courseService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);
  });

  it('should display advanced courses when tab clicked', fakeAsync(() => {
    courseService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    flush();

    const cardTitles = el.queryAll(
      By.css('.mat-tab-body-active .mat-card-title')
    );

    console.log(cardTitles);

    expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');

    expect(cardTitles[0].nativeElement.textContent).toContain(
      'Angular Security Course'
    );
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log('Creating promise');

    Promise.resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully');

        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then() evaluated successfully');

        test = true;
      });
    flushMicrotasks();
    console.log('Running test assertions');

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));
});
