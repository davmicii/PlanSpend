import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categories/category.service';
import { Movement } from '../../models/movements/movement.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  movements: Movement[] = [];

  constructor(private categoryService: CategoryService){}


  ngOnInit(): void {
    this.getMovementsByUserID();
  }


  getMovementsByUserID(): void{
    this.categoryService.getMovementsByUserId().subscribe({
      next: (result) => {
        this.movements = result;
        console.log(this.movements);
      },
      error: (error) => {
        console.error('Error fetching moves', error);
      }
    });
  }

}
