import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentViewPage } from './component-view.page';

describe('ComponentViewPage', () => {
  let component: ComponentViewPage;
  let fixture: ComponentFixture<ComponentViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
