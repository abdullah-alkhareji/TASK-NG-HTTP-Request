import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../../data/pets';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-add-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-pet-form.component.html',
  styleUrl: './add-pet-form.component.css',
})
export class AddPetFormComponent {
  private fb = inject(FormBuilder);
  private modalService = inject(ModalService);
  private petService = inject(PetService);
  private toastService = inject(ToastService);
  petForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    image: ['', Validators.required],
    adopted: [0],
  });

  handleSubmit() {
    if (this.petForm.valid) {
      console.log('Submitted pet:', this.petForm.value);
      this.petService.addPet(this.petForm.value as Pet).subscribe({
        next: (pet) => {
          if (pet) {
            console.log('Pet added:', pet);
            this.modalService.close();
            this.toastService.success('✅ Pet added successfully');
          }
        },
        error: (error) => {
          console.error('Error adding pet:', error);
          this.toastService.error('🚫 Something went wrong, try again later.');
        },
      });
    } else {
      console.log('Form is invalid');
      this.toastService.error('🚫 Form is invalid');
    }
  }
}
