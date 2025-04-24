import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PetsComponent } from './pages/pets/pets.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'pets', component: PetsComponent },
      { path: 'pets/:id', component: PetDetailsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
