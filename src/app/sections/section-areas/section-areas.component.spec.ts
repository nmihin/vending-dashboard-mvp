import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAreasComponent } from './section-areas.component';

describe('SectionAreasComponent', () => {
  let component: SectionAreasComponent;
  let fixture: ComponentFixture<SectionAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
