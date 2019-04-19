import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorViewPage } from './sensor-view.page';

describe('SensorViewPage', () => {
  let component: SensorViewPage;
  let fixture: ComponentFixture<SensorViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
