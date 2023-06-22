import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchappointmentComponent } from './searchappointment.component';

describe('SearchappointmentComponent', () => {
  let component: SearchappointmentComponent;
  let fixture: ComponentFixture<SearchappointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchappointmentComponent]
    });
    fixture = TestBed.createComponent(SearchappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
