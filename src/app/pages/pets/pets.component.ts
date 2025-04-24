import { Component, computed, inject, signal } from '@angular/core';
import { PetsHeaderComponent } from '../../components/pets-header/pets-header.component';
import { PetsListComponent } from '../../components/pets-list/pets-list.component';
import { Pet } from '../../../data/pets';
import { PetService } from '../../services/pet.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [PetsHeaderComponent, PetsListComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  private petService = inject(PetService);

  // Use the refreshable pets observable instead
  readonly allPets = toSignal(this.petService.getPets(), {
    initialValue: [] as Pet[],
  });

  // allPets = toSignal(this.pets$, {
  //   initialValue: [] as Pet[],
  // });
  query = signal('');

  setQuery(query: string) {
    this.query.set(query);
  }

  filteredPets = computed(() =>
    this.allPets().filter((pet: Pet) =>
      pet.name.toLowerCase().includes(this.query().toLowerCase())
    )
  );
}
