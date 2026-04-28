// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'catalogo', loadComponent: () => import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent) },
  { path: 'producto/:id', loadComponent: () => import('./components/producto/producto.component').then(m => m.ProductoComponent) },
  { path: 'favoritos', loadComponent: () => import('./components/favoritos/favoritos.component').then(m => m.FavoritosComponent) },
  { path: 'contacto', loadComponent: () => import('./components/contacto/contacto.component').then(m => m.ContactoComponent) },
  { path: '**', redirectTo: '' }
];
