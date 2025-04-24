import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../../data/pets';

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
            // this.toastService.success('Pet added successfully');
          }
        },
        error: (error) => {
          console.error('Error adding pet:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
