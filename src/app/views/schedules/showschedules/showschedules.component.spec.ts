import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowschedulesComponent } from './showschedules.component';

describe('ShowschedulesComponent', () => {
  let component: ShowschedulesComponent;
  let fixture: ComponentFixture<ShowschedulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowschedulesComponent]
    });
    fixture = TestBed.createComponent(ShowschedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
