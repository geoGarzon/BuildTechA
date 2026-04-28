// src/app/components/catalogo/catalogo.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="catalog">
      <!-- Sidebar -->
      <aside class="catalog__sidebar">
        <h3 class="catalog__sidebar-title">CATEGORÍAS</h3>
        <ul class="catalog__categories">
          @for (cat of categories; track cat.id) {
            <li>
              <button
                class="catalog__cat-btn"
                [class.active]="selectedCategory() === cat.id"
                (click)="selectCategory(cat.id)">
                {{ cat.label }}
              </button>
            </li>
          }
        </ul>
      </aside>

      <!-- Main -->
      <main class="catalog__main">
        <h1 class="catalog__title">{{ currentCategoryLabel() }}</h1>
        <p class="catalog__count">{{ filteredProducts().length }} ITEMS CARGADOS / {{ currentCategoryLabel() }}</p>

        <div class="catalog__grid">
          @for (product of filteredProducts(); track product.id) {
            <div class="product-card">
              <div class="product-card__img-wrap" [routerLink]="['/producto', product.id]">
                <button
                  class="product-card__fav-btn"
                  [class.active]="isFavorite(product.id)"
                  (click)="toggleFav($event, product)"
                  aria-label="Agregar a favoritos">
                  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="1.5"/></svg>
                </button>
                <img [src]="product.image" [alt]="product.name" class="product-card__img">
              </div>
              <div class="product-card__info">
                <span class="product-card__spec">{{ product.spec }}</span>
                <h3 class="product-card__name">{{ product.name }}</h3>
                <p class="product-card__price"><strong>precio aprox {{ product.price | currency:'USD':'symbol':'1.2-2' }}</strong></p>
                <a [routerLink]="['/producto', product.id]" class="btn btn--primary">VER PRODUCTO</a>
              </div>
            </div>
          }
        </div>
      </main>
    </div>

    <!-- Toast -->
    @if (toastMessage()) {
      <div class="toast">{{ toastMessage() }}</div>
    }
  `,
  styles: [`
    .catalog { display: grid; grid-template-columns: 240px 1fr; gap: 60px; max-width: 1280px; margin: 0 auto; padding: 60px 40px; }
    .catalog__sidebar-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 24px; border-bottom: 2px solid #000; padding-bottom: 12px; }
    .catalog__categories { display: flex; flex-direction: column; gap: 4px; list-style: none; padding: 0; }
    .catalog__cat-btn { background: none; border: none; font-family: inherit; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; color: #999; cursor: pointer; padding: 6px 0; text-align: left; transition: color 0.2s; }
    .catalog__cat-btn:hover, .catalog__cat-btn.active { color: #000; }
    .catalog__cat-btn.active { font-weight: 900; border-left: 2px solid #000; padding-left: 8px; }
    .catalog__title { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; font-style: italic; letter-spacing: -1px; margin-bottom: 8px; }
    .catalog__count { font-size: 0.65rem; color: #999; letter-spacing: 2px; margin-bottom: 40px; }
    .catalog__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 32px; }
    .product-card { display: flex; flex-direction: column; border: 1px solid #E8E8E8; }
    .product-card__img-wrap { position: relative; background: #f5f5f5; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; }
    .product-card__img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
    .product-card__img-wrap:hover .product-card__img { transform: scale(1.05); }
    .product-card__fav-btn { position: absolute; top: 12px; right: 12px; z-index: 2; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .product-card__fav-btn svg { width: 18px; height: 18px; fill: none; stroke: #000; stroke-linecap: round; stroke-linejoin: round; }
    .product-card__fav-btn.active svg { fill: #e63946; stroke: #e63946; }
    .product-card__info { padding: 16px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .product-card__spec { font-size: 0.6rem; color: #999; letter-spacing: 2px; font-weight: 600; }
    .product-card__name { font-size: 0.85rem; font-weight: 800; font-style: italic; }
    .product-card__price { font-size: 0.8rem; font-style: italic; }
    .btn { display: inline-block; padding: 12px 20px; font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; text-align: center; cursor: pointer; border: none; text-decoration: none; font-family: inherit; margin-top: auto; }
    .btn--primary { background: #000; color: #fff; transition: background 0.2s; }
    .btn--primary:hover { background: #333; }
    .toast { position: fixed; bottom: 30px; right: 30px; background: #000; color: #fff; padding: 16px 28px; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; z-index: 9999; animation: slideUp 0.3s ease; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class CatalogoComponent {
  private productService = inject(ProductService);
  private favService = inject(FavoritesService);

  categories: Category[] = this.productService.getCategories();
  selectedCategory = signal<string>('procesadores');
  toastMessage = signal<string>('');

  filteredProducts = computed(() =>
    this.productService.getProductsByCategory(this.selectedCategory())
  );

  currentCategoryLabel = computed(() => {
    const cat = this.categories.find(c => c.id === this.selectedCategory());
    return cat?.label ?? '';
  });

  selectCategory(id: string): void {
    this.selectedCategory.set(id);
  }

  isFavorite(id: number): boolean {
    return this.favService.isFavorite(id);
  }

  toggleFav(event: Event, product: Product): void {
    event.stopPropagation();
    const result = this.favService.toggleFavorite(product);
    const msg = result === 'added' ? '✓ Producto agregado a favoritos ♡' : '✓ Producto eliminado de favoritos';
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
