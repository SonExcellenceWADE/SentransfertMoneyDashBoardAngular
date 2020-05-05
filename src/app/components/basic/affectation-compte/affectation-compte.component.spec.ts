import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationCompteComponent } from './affectation-compte.component';

describe('AffectationCompteComponent', () => {
  let component: AffectationCompteComponent;
  let fixture: ComponentFixture<AffectationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
