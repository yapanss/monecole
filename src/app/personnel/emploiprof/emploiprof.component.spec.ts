import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiprofComponent } from './emploiprof.component';

describe('EmploiprofComponent', () => {
  let component: EmploiprofComponent;
  let fixture: ComponentFixture<EmploiprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploiprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
