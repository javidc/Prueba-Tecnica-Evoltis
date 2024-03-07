import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubesViewComponent } from './clubes-view.component';

describe('ClubesViewComponent', () => {
  let component: ClubesViewComponent;
  let fixture: ComponentFixture<ClubesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubesViewComponent]
    });
    fixture = TestBed.createComponent(ClubesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
