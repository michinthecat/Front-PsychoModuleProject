import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotespatientComponent } from './notespatient.component';

describe('NotespatientComponent', () => {
  let component: NotespatientComponent;
  let fixture: ComponentFixture<NotespatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotespatientComponent]
    });
    fixture = TestBed.createComponent(NotespatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
