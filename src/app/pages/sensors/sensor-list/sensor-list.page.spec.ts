import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorListPage } from './sensor-list.page';

describe('SensorListPage', () => {
  let component: SensorListPage;
  let fixture: ComponentFixture<SensorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
