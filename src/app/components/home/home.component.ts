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
    <!-- HERO con imagen real -->
    <section class="hero" style="background-image: url('assets/f5ebfbd9d2c83df18cebf69b86cb0205b0cb8215.png');">
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
        <h2 class="section-title">COMPONENTES</h2>
        <div class="components__grid">
          @for (product of featuredProducts; track product.id) {
            <div class="product-card" [routerLink]="['/producto', product.id]">
              <div class="product-card__img-wrap">
                <img [src]="product.image" [alt]="product.name" class="product-card__img">
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
          <img src="assets/894d723b2748fe75b45e00061776a797e774ecd6.png" alt="Componentes tecnológicos" class="help__img">
        </div>
      </div>
    </section>

    <!-- SETUPS DE USUARIOS -->
    <section class="setups">
      <div class="container">
        <h2 class="section-title">EQUIPOS MONTADOS POR OTROS USUARIOS</h2>
        <div class="setups__grid">
          <div class="setups__card setups__card--large">
            <div class="setups__card-img" style="background-image: url('assets/e8a521f9990aae5a7d01733b76a4ffe1f4b53e8c.png');"></div>
            <div class="setups__card-overlay">
              <span class="setups__card-author">JORGE</span>
              <p class="setups__card-desc">PC Gamer para alcanzar 120fps a 4K</p>
              <a routerLink="/catalogo" class="btn btn--white">VER COMPONENTES</a>
            </div>
          </div>
          <div class="setups__card-col">
            <div class="setups__card">
              <div class="setups__card-img" style="background-image: url('assets/3682a43fbf963364c20151981858a5d6f2275b0f.png');"></div>
            </div>
            <div class="setups__card">
              <div class="setups__card-img" style="background-image: url('assets/c5a24d70feff52b1723fffca6c58283b2e8b089a.png');"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; }

    /* HERO */
    .hero { position: relative; min-height: 85vh; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; background-repeat: no-repeat; overflow: hidden; }
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
    .product-card { cursor: pointer; border: 1px solid #E8E8E8; transition: box-shadow 0.2s; overflow: hidden; }
    .product-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .product-card__img-wrap { background: #f5f5f5; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .product-card__img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
    .product-card:hover .product-card__img { transform: scale(1.05); }
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
    .help__img { width: 100%; max-height: 400px; object-fit: contain; }

    /* SETUPS */
    .setups { padding: 80px 0; }
    .setups__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .setups__card { position: relative; overflow: hidden; }
    .setups__card--large { grid-row: span 2; }
    .setups__card-img { width: 100%; height: 100%; min-height: 300px; background-size: cover; background-position: center; background-repeat: no-repeat; }
    .setups__card--large .setups__card-img { min-height: 100%; }
    .setups__card-col { display: flex; flex-direction: column; gap: 16px; }
    .setups__card-col .setups__card-img { min-height: 200px; }
    .setups__card-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); }
    .setups__card-author { font-size: 1.2rem; font-weight: 900; color: #fff; display: block; margin-bottom: 4px; }
    .setups__card-desc { font-size: 0.75rem; color: #ccc; margin-bottom: 16px; }
  `]
})
export class HomeComponent {
  private productService = inject(ProductService);
  featuredProducts: Product[] = this.productService.getFeaturedProducts(6);
}
