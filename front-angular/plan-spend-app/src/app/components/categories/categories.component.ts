import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { CategoryService } from '../../services/categories/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/categories/category.model';
//Modal
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class CategoriesComponent implements OnInit {
  //Interface
  categories: Category[] = [];
  globalCategoryId: number | null = null;
  selectedCategory: any;
  recordidCategory: any;
  typeCategory: any;
  registerForm!: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder){}

  ngOnInit(): void {
      this.getCategorieById();

      this.registerForm = this.fb.group({
        pname: new FormControl(),
        ptype: new FormControl(),
        pdate: new FormControl(),
        pamount: new FormControl(),
        pdescription: new FormControl()
      });
  }

  getCategorieById(): void {
    this.categoryService.getCategoryByUserId().subscribe({
      next: (result) => {
        this.categories = result;
        this.categories.forEach(category => {
          this.globalCategoryId = category.pcategory_id;
        });

        // Inicializa DataTable aquí después de que tasks se haya actualizado
        setTimeout(() => {
          const tableElement = document.querySelector('#example');
          if (tableElement) {
            new DataTable(tableElement as HTMLTableElement);
          }
        }, 0); // Permite que Angular complete el renderizado antes de inicializar
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //Modal details
  openModalDetails(categoryId: number): void {
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
        this.categoryService.getCategoryByCategoryId(categoryId).subscribe({
          next: (result) => {
            this.selectedCategory = result;
            //console.log(result);
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
      id: 'crud-modal',
      override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    modal.show();
  }

  //Modal delete
  openModalDelete(categoryId: number): void {
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
        this.categoryService.getCategoryByCategoryId(categoryId).subscribe({
          next: (result) => {
            this.selectedCategory = result.pcategory_id;
            this.recordidCategory = result.precord_id;
            this.typeCategory = result.ptype;
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
    this.categoryService.deleteCategoryByCategoryId(this.selectedCategory, this.recordidCategory, this.typeCategory).subscribe({
      next: (result) => {
        console.log(result);
        this.categories = this.categories.filter(category => category.pcategory_id !== this.selectedCategory);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //Modal update
  openModalUpdate(categoryId: number): void {
    //this.globalCategoryId = categoryId;
    const $modalElement: HTMLElement = document.querySelector('#update-modal')!;

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
        this.categoryService.getCategoryByCategoryId(categoryId).subscribe({
          next: (result) => {
            this.selectedCategory = result;
            this.registerForm.patchValue({
              pname: this.selectedCategory.pname,
              ptype: this.selectedCategory.ptype,
              pdate: this.selectedCategory.pdate,
              pamount: this.selectedCategory.pamount,
              pdescription: this.selectedCategory.pdescription
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
      id: 'crud-modal',
      override: true
    };
    const modal: ModalInterface = new Modal($modalElement, modalOptions, instanceOptions);
    modal.show();
  }

}
