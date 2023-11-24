import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSingleComponent } from './application-single.component';

describe('ApplicationSingleComponent', () => {
  let component: ApplicationSingleComponent;
  let fixture: ComponentFixture<ApplicationSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
