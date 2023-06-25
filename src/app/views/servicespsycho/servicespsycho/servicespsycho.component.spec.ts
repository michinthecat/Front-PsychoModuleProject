import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicespsychoComponent } from './servicespsycho.component';

describe('ServicespsychoComponent', () => {
  let component: ServicespsychoComponent;
  let fixture: ComponentFixture<ServicespsychoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicespsychoComponent]
    });
    fixture = TestBed.createComponent(ServicespsychoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
