import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffectationCompteComponent } from './list-affectation-compte.component';

describe('ListAffectationCompteComponent', () => {
  let component: ListAffectationCompteComponent;
  let fixture: ComponentFixture<ListAffectationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAffectationCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAffectationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
