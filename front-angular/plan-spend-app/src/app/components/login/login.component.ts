import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit():void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData.email, loginData.password).subscribe(
        (response) => {
          const token = response.token;
          this.authService.saveToken(token);
          const decodedToken = jwtDecode(token) as any;
          const session = decodedToken.id;
          localStorage.setItem('session', session);
          this.authService.setUser(decodedToken); // Establecer el usuario decodificado en el servicio

          this.router.navigate(['/dashboard/home']);
        },
        (error) => {
          if(error.status === 404) {
            this.errorMessage = 'El correo es incorrecto';
          } else if(error.status === 401){
            this.errorMessage = 'La contraseña es incorrecta';
          }else{
            this.errorMessage = 'Error desconocido. Intente nuevamente';
          }
        }
      );
    } else {
    }
  }
}
