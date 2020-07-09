import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindhopperComponent } from './findhopper.component';

describe('FindhopperComponent', () => {
  let component: FindhopperComponent;
  let fixture: ComponentFixture<FindhopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindhopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindhopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
