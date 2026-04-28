// src/app/components/home/home.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="hero__content container">
        <h1 class="hero__title">AQUÍ ELIGES LOS<br>MEJORES COMPONENTES</h1>
        <div class="hero__buttons">
          <a routerLink="/catalogo" class="btn btn--white">VER CATÁLOGO</a>
          <a routerLink="/contacto" class="btn btn--ghost">CONTÁCTANOS</a>
        </div>
      </div>
    </section>

    <!-- COMPONENTES DESTACADOS -->
    <section class="components">
      <div class="container">
        <div class="components__header">
          <h2 class="section-title">COMPONENTES</h2>
        </div>
        <div class="components__grid">
          @for (product of featuredProducts; track product.id) {
            <div class="product-card" [routerLink]="['/producto', product.id]">
              <div class="product-card__img-wrap">
                <div class="product-card__img-placeholder">
                  <span>{{ product.categoryLabel }}</span>
                </div>
              </div>
              <div class="product-card__info">
                <span class="product-card__category">{{ product.categoryLabel }}</span>
                <h3 class="product-card__name">{{ product.name }}</h3>
                <p class="product-card__price">{{ product.price | currency:'USD':'symbol':'1.0-0' }} Aprox</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SECCIÓN AYUDA -->
    <section class="help">
      <div class="help__content container">
        <div class="help__text">
          <h2 class="help__title">TE AYUDAMOS<br>A ELEGIR LO MEJOR</h2>
          <p class="help__description">Puedes encontrar el listado de todos los componentes que necesitas para armar tu equipo de cómputo.</p>
          <a routerLink="/catalogo" class="btn btn--white">VER CATÁLOGO</a>
        </div>
        <div class="help__visual">
          <div class="help__visual-box"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; }

    /* HERO */
    .hero { position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center; background: #111; overflow: hidden; }
    .hero__overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
    .hero__content { position: relative; z-index: 1; text-align: center; }
    .hero__title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 900; color: #fff; font-style: italic; line-height: 1.1; letter-spacing: -1px; margin-bottom: 40px; }
    .hero__buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 14px 32px; font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-decoration: none; transition: all 0.2s; cursor: pointer; border: 2px solid transparent; }
    .btn--white { background: #fff; color: #000; }
    .btn--white:hover { background: transparent; color: #fff; border-color: #fff; }
    .btn--ghost { background: transparent; color: #fff; border-color: #fff; }
    .btn--ghost:hover { background: #fff; color: #000; }

    /* COMPONENTS */
    .components { padding: 80px 0; }
    .section-title { font-size: 1.5rem; font-weight: 900; letter-spacing: 3px; font-style: italic; margin-bottom: 40px; }
    .components__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 32px; }
    .product-card { cursor: pointer; border: 1px solid #E8E8E8; transition: box-shadow 0.2s; }
    .product-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .product-card__img-wrap { background: #f5f5f5; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .product-card__img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e, #16213e); color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; }
    .product-card__info { padding: 20px; }
    .product-card__category { font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; color: #999; display: block; margin-bottom: 4px; }
    .product-card__name { font-size: 0.9rem; font-weight: 800; margin-bottom: 8px; }
    .product-card__price { font-size: 0.85rem; font-weight: 700; font-style: italic; }

    /* HELP */
    .help { background: #000; padding: 80px 0; }
    .help__content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .help__title { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 900; color: #fff; font-style: italic; line-height: 1.1; margin-bottom: 20px; }
    .help__description { font-size: 0.9rem; color: #aaa; margin-bottom: 32px; line-height: 1.7; }
    .help__visual { display: flex; align-items: center; justify-content: center; }
    .help__visual-box { width: 100%; aspect-ratio: 4/3; background: linear-gradient(135deg, #1a1a2e, #0f3460); border-radius: 4px; }
  `]
})
export class HomeComponent {
  private productService = inject(ProductService);
  featuredProducts: Product[] = this.productService.getFeaturedProducts(6);
}
