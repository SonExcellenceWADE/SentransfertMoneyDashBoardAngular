import { MatFormFieldModule, MatInputModule, MAT_DIALOG_DATA, MatDialogRef, MatCheckboxModule, MatRadioModule, MatSliderModule, MatSelectModule, MatCardModule, MatSlideToggleModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RetraitRoutingModule } from './retrait-routing.module';
import { JwtInterceptorService } from '../../../helpers/jwt-interceptor.service';
import { RetraitComponent } from './retrait.component';



@NgModule({
  imports: [
    CommonModule,
    RetraitRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatIconModule,
    MatSliderModule
    
  ],
  declarations: [RetraitComponent],
  providers: [
    DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true, },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class RetraitModule { }
