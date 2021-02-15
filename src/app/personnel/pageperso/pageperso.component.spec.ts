import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagepersoComponent } from './pageperso.component';

describe('PagepersoComponent', () => {
  let component: PagepersoComponent;
  let fixture: ComponentFixture<PagepersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagepersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagepersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
