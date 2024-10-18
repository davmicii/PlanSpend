import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  passwordsMatch: boolean = true;
  duplicateError: string = '';


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Suscribirse a los cambios en los campos de contraseña
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  // Método para verificar si las contraseñas coinciden
  checkPasswords() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }


  // Método para enviar el formulario
  onSubmit():void {
    this.submitted = true;
    if (this.registerForm.valid && this.passwordsMatch) {
      const loginData = this.registerForm.value;
      this.authService.register(loginData.username, loginData.email, loginData.password).subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Manejo basado en el formato de error
          if (error.status === 500){
            this.duplicateError = 'This username or email is already taken.';
            console.clear();
          }else{
            if (error.error && error.error.message) {
              const errorMessage = error.error.message;
              if (errorMessage.includes('users_email_key')) {
                this.duplicateError = 'This email is already taken.';
              } else if (errorMessage.includes('users_username_key')) {
                this.duplicateError = 'This username is already taken.';
              } else {
                this.duplicateError = 'An unknown error occurred';
              }
            } else {
              this.duplicateError = 'An unknown error occurred';
            }
          }
        });
    } else {
    }
  }
}
