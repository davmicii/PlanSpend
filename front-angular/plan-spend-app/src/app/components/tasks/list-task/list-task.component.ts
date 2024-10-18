import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { TaskService } from '../../../services/tasks/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/tasks/task.model';
//Modal
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export default class ListTaskComponent implements OnInit{
  tasks: Task[] = [];
  selectedTaskId: any;
  submitted: boolean = false;
  registerForm!: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getTaskById();
    this.registerForm = this.fb.group({
      title: new FormControl(),
      due_date: new FormControl(),
      isCompleted: new FormControl(),
      description: new FormControl(),
    });
  }

  getTaskById(): void {
    this.taskService.getTaskByUserId().subscribe({
      next: (result) => {
        this.tasks = result;

        // Inicializar DataTable después de que tasks se haya actualizado
        setTimeout(() => {
          const tableElement = document.querySelector('#example');
          if (tableElement) {
            new DataTable(tableElement as HTMLTableElement);
          }
        }, 0); // Permite a Angular completar el renderizado antes de inicializar
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //Modal delete
  openModalDelete(ptask_id: number): void {
    //this.globalCategoryId = categoryId;
    const $modalElement: HTMLElement = document.querySelector('#popup-modal')!;

    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          //console.log('modal is hidden');
      },
      onShow: () => {
        this.taskService.getTaskByTaskId(ptask_id).subscribe({
          next: (result) => {
            const task = result[0];
            if (task) {
              this.selectedTaskId = task.ptask_id;
            } else {
              console.log("No se encontró la tarea");
            }
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      onToggle: () => {
          console.log('modal has been toggled');
      },
    };
    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'popup-modal',
      override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    modal.show();
  }

  //Delete confirmation button
  confirmDelete(): void{
    this.taskService.deleteTask(this.selectedTaskId).subscribe({
      next: (result) => {
        this.tasks = this.tasks.filter(task => task.ptask_id !== this.selectedTaskId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  //Modal edit
  openModalEdit(ptask_id: number): void {
    //this.globalCategoryId = categoryId;
    const $modalElement: HTMLElement = document.querySelector('#crud-modal')!;

    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          //console.log('modal is hidden');
      },
      onShow: () => {
        this.taskService.getTaskByTaskId(ptask_id).subscribe({
          next: (result) => {
            const task = result[0];
            this.selectedTaskId = task;
            this.registerForm.patchValue({
              title: this.selectedTaskId.p_title,
              due_date: this.selectedTaskId.p_due_date,
              isCompleted: this.selectedTaskId.p_is_completed,
              description: this.selectedTaskId.p_description
            });
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      onToggle: () => {
          console.log('modal has been toggled');
      },
    };
    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'popup-modal',
      override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    modal.show();
  }

  //Update confirmation button
  confirmUpdate(): void{
    this.submitted = true;
    if (this.registerForm.valid) {
      const expenseData = this.registerForm.value;
      this.taskService.updateTask(this.selectedTaskId.ptask_id, expenseData).subscribe({
        next: (result) => {
          this.getTaskById();
          this.closeModal();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  // Función para cerrar el modal
  closeModal() {
    const $modalElement: HTMLElement = document.querySelector('#crud-modal')!;
    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          //console.log('modal is hidden');
      },
      onShow: () => {
      },
      onToggle: () => {
          console.log('modal has been toggled');
      },
    };
    const instanceOptions: InstanceOptions = {
      id: 'popup-modal',
      override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    modal.hide();
  }
}
