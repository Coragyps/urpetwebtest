import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {  }
  login(){
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any)=>{
      sessionStorage.setItem('token', data.jwttoken);
      this.router.navigate(['homes'])
    },
    (error)=>{
      this.mensaje = 'Credenciales incorrectas!!!';
      this.snackBar.open(this.mensaje, 'Aviso',{duration:2000});
    }
  );

  }

}