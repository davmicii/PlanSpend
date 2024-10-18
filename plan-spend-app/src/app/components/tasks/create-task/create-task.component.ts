import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/tasks/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export default class CreateTaskComponent implements OnInit{
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;
  duplicateError: string = '';


  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }


  // Método para enviar el formulario
  onSubmit():void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const taskData = this.registerForm.value;
      this.taskService.createTask(taskData.title, taskData.description, taskData.due_date).subscribe(
        (response) => {
          this.router.navigate(['/dashboard/tasks/my-tasks']);
        },
        (error) => {
          // Manejo basado en el formato de error
          console.log(error.message);
        });
    } else {
    }
  }

}
