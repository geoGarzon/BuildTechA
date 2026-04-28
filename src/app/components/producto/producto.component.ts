// src/app/components/producto/producto.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    @if (product()) {
      <div class="product-detail">
        <!-- Hero del producto -->
        <section class="product-detail__hero">
          <div class="container">
            <div class="product-detail__image-wrap">
                <img [src]="product()!.image" [alt]="product()!.name" class="product-detail__img">
              </div>
            <div class="product-detail__info">
              <span class="product-detail__category">{{ product()!.categoryLabel }}</span>
              <h1 class="product-detail__name">{{ product()!.name }}</h1>
              <p class="product-detail__price">{{ product()!.price | currency:'USD':'symbol':'1.2-2' }} Aprox</p>
              <p class="product-detail__desc">{{ product()!.description }}</p>

              <!-- Especificaciones -->
              @if (product()!.cores) {
                <div class="product-detail__specs">
                  <div class="spec-item">
                    <span class="spec-label">Núcleos</span>
                    <span class="spec-value">{{ product()!.cores }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label">Hilos</span>
                    <span class="spec-value">{{ product()!.threads }}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label">Velocidad de reloj</span>
                    <span class="spec-value">{{ product()!.clock }}</span>
                  </div>
                </div>
              }

              <button
                class="btn btn--primary"
                [class.btn--added]="isFavorite()"
                (click)="toggleFavorite()">
                {{ isFavorite() ? '♥ EN FAVORITOS' : 'AGREGAR A FAVORITOS' }}
              </button>
            </div>
          </div>
        </section>

        <!-- Descripción completa -->
        <section class="product-detail__body">
          <div class="container">
            <aside class="detail-sidebar">
              <button class="detail-tab active">ESPECIFICACIONES</button>
              <button class="detail-tab">DESCRIPCIÓN</button>
              <button class="detail-tab">INFORMACIÓN TÉCNICA</button>
            </aside>
            <div class="detail-content">
              <h2>DESCRIPCIÓN</h2>
              <p>{{ product()!.fullDescription }}</p>
            </div>
          </div>
        </section>

        <div class="back-link container">
          <a routerLink="/catalogo" class="btn btn--outline">← VOLVER AL CATÁLOGO</a>
        </div>
      </div>
    } @else {
      <div class="not-found container">
        <h2>Producto no encontrado</h2>
        <a routerLink="/catalogo" class="btn btn--primary">Volver al catálogo</a>
      </div>
    }

    @if (toastMessage()) {
      <div class="toast">{{ toastMessage() }}</div>
    }
  `,
  styles: [`
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; }

    /* Hero */
    .product-detail__hero .container { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; padding-top: 60px; padding-bottom: 60px; }
    .product-detail__image-wrap { background: #f5f5f5; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .product-detail__img { width: 100%; height: 100%; object-fit: contain; }
    .product-detail__category { font-size: 0.65rem; font-weight: 700; letter-spacing: 3px; color: #999; display: block; margin-bottom: 8px; }
    .product-detail__name { font-size: clamp(1.8rem, 3vw, 3rem); font-weight: 900; line-height: 1.1; margin-bottom: 16px; }
    .product-detail__price { font-size: 1.3rem; font-weight: 700; font-style: italic; margin-bottom: 16px; }
    .product-detail__desc { font-size: 0.9rem; color: #555; line-height: 1.7; margin-bottom: 24px; }
    .product-detail__specs { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; border-top: 1px solid #E8E8E8; padding-top: 24px; }
    .spec-item { display: flex; justify-content: space-between; font-size: 0.8rem; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .spec-label { color: #999; font-weight: 500; }
    .spec-value { font-weight: 700; }

    /* Body */
    .product-detail__body { background: #fafafa; padding: 60px 0; }
    .product-detail__body .container { display: grid; grid-template-columns: 200px 1fr; gap: 60px; }
    .detail-sidebar { display: flex; flex-direction: column; gap: 4px; }
    .detail-tab { background: none; border: none; font-family: inherit; font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; color: #999; cursor: pointer; padding: 10px 0; text-align: left; }
    .detail-tab.active { color: #000; }
    .detail-content h2 { font-size: 1.5rem; font-weight: 900; font-style: italic; margin-bottom: 20px; }
    .detail-content p { font-size: 0.9rem; color: #555; line-height: 1.8; }

    /* Buttons */
    .btn { display: inline-block; padding: 16px 32px; font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; cursor: pointer; border: 2px solid transparent; font-family: inherit; text-decoration: none; transition: all 0.2s; }
    .btn--primary { background: #000; color: #fff; border-color: #000; }
    .btn--primary:hover { background: #333; }
    .btn--added { background: #e63946; border-color: #e63946; }
    .btn--outline { background: transparent; color: #000; border-color: #000; }
    .btn--outline:hover { background: #000; color: #fff; }

    .back-link { padding: 32px 40px; }
    .not-found { padding: 80px 40px; text-align: center; }
    .not-found h2 { margin-bottom: 24px; }
    .toast { position: fixed; bottom: 30px; right: 30px; background: #000; color: #fff; padding: 16px 28px; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; z-index: 9999; animation: slideUp 0.3s ease; }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class ProductoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private favService = inject(FavoritesService);

  product = signal<Product | undefined>(undefined);
  toastMessage = signal<string>('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product.set(this.productService.getProductById(id));
  }

  isFavorite(): boolean {
    const p = this.product();
    return p ? this.favService.isFavorite(p.id) : false;
  }

  toggleFavorite(): void {
    const p = this.product();
    if (!p) return;
    const result = this.favService.toggleFavorite(p);
    const msg = result === 'added' ? '✓ Producto agregado a favoritos ♡' : '✓ Producto eliminado de favoritos';
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
