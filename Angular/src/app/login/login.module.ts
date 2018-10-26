import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
 
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService,RouterModule],
})
export class LoginModule { }
