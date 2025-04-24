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

  getPets(): Observable<Pet[]> {
    return this.get<Pet[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching pets', error);
        return of([]);
      })
    );
  }

  getPet(id: number): Observable<Pet | null> {
    const url = `${this.apiUrl}/${id}`;
    const res = this.get<Pet>(url).pipe(
      catchError((error) => {
        console.error('Error fetching pet', error);
        return of(null);
      })
    );
    return res;
  }

  addPet(pet: Pet): Observable<Pet | null> {
    return this.post<Pet>(this.apiUrl, pet).pipe(
      catchError((error) => {
        console.error('Error adding pet', error);

        return of(null);
      })
    );
  }

  deletePet(id: number): Observable<Pet | null> {
    const url = `${this.apiUrl}/${id}`;

    return this.delete<Pet>(url).pipe(
      catchError((error) => {
        console.error('Error deleting pet', error);

        return of(null);
      })
    );
  }

  adoptPet(pet: Pet): Observable<Pet | null> {
    const url = `${this.apiUrl}/${pet.id}`;
    return this.put<Pet>(url, { ...pet, adopted: 1 } as Pet).pipe(
      catchError((error) => {
        console.error('Error adopting pet', error);

        return of(null);
      })
    );
  }
}
