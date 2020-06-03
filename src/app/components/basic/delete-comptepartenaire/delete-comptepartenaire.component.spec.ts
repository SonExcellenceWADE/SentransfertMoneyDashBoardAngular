import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComptepartenaireComponent } from './delete-comptepartenaire.component';

describe('DeleteComptepartenaireComponent', () => {
  let component: DeleteComptepartenaireComponent;
  let fixture: ComponentFixture<DeleteComptepartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComptepartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComptepartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
