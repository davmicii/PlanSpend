import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth/auth.service';
import { TaskService } from '../../services/tasks/task.service';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  taskCount: number = 0;

  constructor(private flowbiteService: FlowbiteService, private authService: AuthService, private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      //console.log('Flowbite loaded', flowbite);
      initFlowbite();
    });
    this.getTaskNotCompleted();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getTaskNotCompleted(): void{
    this.taskService.getTaskByIsNotCompleted().subscribe({
      next: (result) => {
        this.taskCount = result.count_incomplete_tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });
  }

  gotoCreateIncome(): void{
    this.router.navigate(['/dashboard/incomes/create']);
  }

  gotoCreateExpense(): void{
    this.router.navigate(['/dashboard/expenses/create']);
  }

  gotoCreateTask(): void{
    this.router.navigate(['/dashboard/tasks/create']);
  }

  gotoCreateNote(): void{
    this.router.navigate(['/dashboard/notes/create']);
  }
}
