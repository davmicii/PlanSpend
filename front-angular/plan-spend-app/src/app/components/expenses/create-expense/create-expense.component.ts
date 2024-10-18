import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { ExpenseService } from '../../../services/expenses/expense.service';

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-expense.component.html',
  styleUrl: './create-expense.component.css'
})
export default class CreateExpenseComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  duplicateError: string = '';
  category_type: string = 'expense';


  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router) {
  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      category_name: ['', [Validators.required]],
      expense_amount: ['', [Validators.required]],
      expense_description: ['', [Validators.required]],
      expense_date: ['', [Validators.required]]
    });
  }


  // Método para enviar el formulario
  onSubmit():void {
    const sessionString = localStorage.getItem('session');
    const session = sessionString ? parseInt(sessionString, 10) : 0;
    this.submitted = true;
    if (this.registerForm.valid) {
      const expenseData = this.registerForm.value;
      this.expenseService.createExpense(session, expenseData.category_name, this.category_type, expenseData.expense_description, expenseData.expense_amount, expenseData.expense_date).subscribe(
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
