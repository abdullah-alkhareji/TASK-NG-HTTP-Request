import { Component, inject, Signal, computed } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Pet } from '../../../data/pets';
import { PetService } from '../../services/pet.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap, of } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';

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
  private toastService = inject(ToastService);

  // Convert route params to signal
  private params = toSignal(this.route.paramMap);

  // Pet data signal derived from params
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
          this.toastService.success('✅ Pet deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting pet:', error);
          this.toastService.error('🚫 Something went wrong, try again later.');
        },
      });
    }
  }

  adoptPet() {
    if (this.pet()) {
      this.petService.adoptPet(this.pet()!).subscribe({
        next: () => {
          this.toastService.success('✅ Pet adopted successfully');
          const id = this.pet()!.id;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/pets', id]);
            });
        },
        error: (error) => {
          console.error('Error adopting pet:', error);
          this.toastService.error('🚫 Something went wrong, try again later.');
        },
      });
    }
  }
}
