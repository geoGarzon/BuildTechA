// src/app/components/favoritos/favoritos.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="favoritos container">
      <h1 class="favoritos__title">FAVORITOS</h1>

      @if (favorites().length === 0) {
        <div class="favoritos__empty">
          <div class="favoritos__empty-icon">♡</div>
          <h2>Aún no has agregado componentes a tu lista de favoritos.</h2>
          <a routerLink="/catalogo" class="btn btn--primary">EXPLORAR CATÁLOGO</a>
        </div>
      } @else {
        <div class="favoritos__grid">
          @for (product of favorites(); track product.id) {
            <div class="fav-card" [id]="'fav-card-' + product.id">
              <div class="fav-card__img-wrap" [routerLink]="['/producto', product.id]">
                <img [src]="product.image" [alt]="product.name" class="fav-card__img">
              </div>
              <div class="fav-card__info">
                <div class="fav-card__meta">
                  <h3 class="fav-card__name">{{ product.name }}</h3>
                  <span class="fav-card__price">{{ product.price | currency:'USD':'symbol':'1.2-2' }}</span>
                </div>
                <span class="fav-card__category">{{ product.categoryLabel }}</span>
                <button class="btn btn--remove" (click)="remove(product)">
                  ELIMINAR DE LA LISTA
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; }
    .favoritos { padding: 60px 40px; }
    .favoritos__title { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 900; font-style: italic; letter-spacing: -1px; margin-bottom: 48px; }

    /* Empty */
    .favoritos__empty { text-align: center; padding: 80px 0; }
    .favoritos__empty-icon { font-size: 4rem; margin-bottom: 24px; color: #E8E8E8; }
    .favoritos__empty h2 { font-size: 1rem; font-weight: 600; color: #999; margin-bottom: 32px; }

    /* Grid */
    .favoritos__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 32px; }
    .fav-card { border: 1px solid #E8E8E8; display: flex; flex-direction: column; }
    .fav-card__img-wrap { aspect-ratio: 1; cursor: pointer; overflow: hidden; background: #f5f5f5; }
    .fav-card__img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
    .fav-card__img-wrap:hover .fav-card__img { transform: scale(1.05); }
    .fav-card__info { padding: 16px; display: flex; flex-direction: column; gap: 6px; }
    .fav-card__meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .fav-card__name { font-size: 0.85rem; font-weight: 800; font-style: italic; }
    .fav-card__price { font-size: 0.85rem; font-weight: 700; white-space: nowrap; }
    .fav-card__category { font-size: 0.6rem; font-weight: 700; letter-spacing: 2px; color: #999; }

    /* Buttons */
    .btn { display: inline-block; padding: 12px 20px; font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; text-align: center; cursor: pointer; border: none; font-family: inherit; text-decoration: none; transition: all 0.2s; }
    .btn--primary { background: #000; color: #fff; }
    .btn--primary:hover { background: #333; }
    .btn--remove { background: #000; color: #fff; margin-top: 8px; width: 100%; }
    .btn--remove:hover { background: #e63946; }
  `]
})
export class FavoritosComponent {
  private favService = inject(FavoritesService);
  favorites = this.favService.favorites;

  remove(product: Product): void {
    this.favService.removeFavorite(product.id);
  }
}
