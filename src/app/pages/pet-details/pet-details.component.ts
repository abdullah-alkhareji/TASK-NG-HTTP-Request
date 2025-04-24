import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../../data/pets';
import { PetService } from '../../services/pet.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [NotFoundComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css',
})
export class PetDetailsComponent {
  private petService = inject(PetService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pet = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.petService.getPet(id);
      })
    ),
    { initialValue: null as Pet | null }
  );

  deletePet() {
    if (this.pet()) {
      this.petService.deletePet(this.pet()!.id).subscribe({
        next: () => {
          this.router.navigate(['/pets']);
        },
        error: (error) => {
          console.error('Error deleting pet:', error);
        },
      });
    }
  }

  adoptPet() {
    if (this.pet()) {
      this.petService.adoptPet(this.pet()!).subscribe({
        next: () => {
          this.router.navigate(['/pets']);
        },
        error: (error) => {
          console.error('Error adopting pet:', error);
        },
      });
    }
  }
}
