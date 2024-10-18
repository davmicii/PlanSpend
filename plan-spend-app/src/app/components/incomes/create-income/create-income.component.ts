import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IncomeService } from '../../../services/incomes/income.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-income',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-income.component.html',
  styleUrl: './create-income.component.css'
})
export default class CreateIncomeComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  duplicateError: string = '';
  category_type: string = 'income';


  constructor(private fb: FormBuilder, private incomeService: IncomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      category_name: ['', [Validators.required]],
      income_amount: ['', [Validators.required]],
      income_description: ['', [Validators.required]],
      income_date: ['', [Validators.required]]
    });
  }

  // Método para enviar el formulario
  onSubmit():void {
    const sessionString = localStorage.getItem('session');
    const session = sessionString ? parseInt(sessionString, 10) : 0;
    this.submitted = true;
    if (this.registerForm.valid) {
      const incomeData = this.registerForm.value;
      this.incomeService.createIncome(session, incomeData.category_name, this.category_type, incomeData.income_description, incomeData.income_amount, incomeData.income_date).subscribe(
        (response) => {
          this.router.navigate(['/dashboard/home']);
        },
        (error) => {
          // Manejo basado en el formato de error
          console.log(error.message);
        });
    } else {
    }
  }
}
