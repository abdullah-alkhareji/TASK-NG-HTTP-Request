import { Injectable, signal, inject } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, Observable, of, tap, switchMap, finalize } from 'rxjs';
import { Pet } from '../../data/pets';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PetService extends BaseService {
  private apiUrl = 'https://pets-react-query-backend.eapi.joincoded.com/pets';

  private pets = signal<Pet[]>([]);
  private petsQuery = toSignal(this.getPets());
  pets$ = toObservable(this.petsQuery);

  // Create a refresh signal to trigger new requests
  private refreshTrigger = signal(0);

  getPets(): Observable<Pet[]> {
    return this.get<Pet[]>(this.apiUrl).pipe(
      tap((pets) => {
        if (pets.length > 0) {
          // No need to show a toast for fetching the pet list
          // as it's a common operation
        }
      }),
      catchError((error) => {
        console.error('Error fetching pets', error);

        return of([]);
      })
    );
  }

  // Method to force refresh the pet list
  refreshPets(): void {
    this.refreshTrigger.update((val) => val + 1);
  }

  // Create a refreshable pets observable
  getPetsWithRefresh(): Observable<Pet[]> {
    return toObservable(this.refreshTrigger).pipe(
      tap(() => console.log('Refreshing pets...')),
      // Re-fetch pets whenever refreshTrigger changes
      // Switched from tap to switchMap to get the actual Pet[] result
      switchMap(() => this.getPets())
    );
  }

  getPet(id: number): Observable<Pet | null> {
    const url = `${this.apiUrl}/${id}`;
    const res = this.get<Pet>(url).pipe(
      tap((pet) => {
        if (pet) {
          // No need to show a toast for fetching a single pet
          // as it's a common operation
        }
      }),
      catchError((error) => {
        console.error('Error fetching pet', error);
        return of(null);
      })
    );
    return res;
  }

  addPet(pet: Pet): Observable<Pet | null> {
    return this.post<Pet>(this.apiUrl, pet).pipe(
      tap((newPet) => {
        // Trigger refresh after successfully adding a pet
        this.refreshPets();
      }),
      catchError((error) => {
        console.error('Error adding pet', error);

        return of(null);
      })
    );
  }

  deletePet(id: number): Observable<Pet | null> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Attempting to delete pet with ID:', id);

    // Show a notification that deletion is in progress

    return this.delete<Pet>(url).pipe(
      tap((response) => {
        console.log('Delete response:', response);
        // Trigger refresh after successfully deleting a pet
        this.refreshPets();
        // Explicitly show success toast with delay to ensure it replaces the "in progress" toast
        setTimeout(() => {}, 300);
      }),
      catchError((error) => {
        console.error('Error deleting pet', error);

        return of(null);
      }),
      finalize(() => {
        console.log('Delete operation completed');
      })
    );
  }

  adoptPet(pet: Pet): Observable<Pet | null> {
    const url = `${this.apiUrl}/${pet.id}`;
    return this.put<Pet>(url, { ...pet, adopted: 1 } as Pet).pipe(
      tap((updatedPet) => {
        // Trigger refresh after successfully adopting a pet
        this.refreshPets();
      }),
      catchError((error) => {
        console.error('Error adopting pet', error);

        return of(null);
      })
    );
  }
}
