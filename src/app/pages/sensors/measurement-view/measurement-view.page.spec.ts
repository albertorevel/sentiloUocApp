import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementViewPage } from './measurement-view.page';

describe('MeasurementViewPage', () => {
  let component: MeasurementViewPage;
  let fixture: ComponentFixture<MeasurementViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
