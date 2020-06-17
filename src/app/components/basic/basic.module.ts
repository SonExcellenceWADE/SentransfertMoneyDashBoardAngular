
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatCardModule, MatSlideToggleModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatSliderModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import {SharedModule} from '../../shared/shared.module';
import { JwtInterceptorService } from '../../helpers/jwt-interceptor.service';





@NgModule({
  imports: [
    CommonModule,
    BasicRoutingModule,
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
    MatSliderModule,
    FormsModule
  ],
  declarations: [
    BasicComponent,
   
  ],
  providers: [
    DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true, },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class BasicModule { }
