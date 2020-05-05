import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptePartenaireComponent } from './compte-partenaire.component';

describe('ComptePartenaireComponent', () => {
  let component: ComptePartenaireComponent;
  let fixture: ComponentFixture<ComptePartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptePartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
