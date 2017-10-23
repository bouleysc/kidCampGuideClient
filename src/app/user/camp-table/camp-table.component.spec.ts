import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampTableComponent } from './camp-table.component';

describe('CampTableComponent', () => {
  let component: CampTableComponent;
  let fixture: ComponentFixture<CampTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
