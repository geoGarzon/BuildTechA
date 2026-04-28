// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__brand">
          <span class="footer__logo">BUILDTECH</span>
        </div>
        <div class="footer__col">
          <h4 class="footer__section-title">HOME</h4>
          <a routerLink="/catalogo" class="footer__link">Catálogo</a>
          <a routerLink="/favoritos" class="footer__link">Favoritos</a>
          <a routerLink="/contacto" class="footer__link">Contacto</a>
        </div>
        <div class="footer__col">
          <h4 class="footer__section-title">DESARROLLADORES</h4>
          <span class="footer__link">Junior Mosquera</span>
          <span class="footer__link">Samuel Duque</span>
          <span class="footer__link">Daniel González</span>
          <span class="footer__link">Georgette Garzón</span>
        </div>
        <div class="footer__col">
          <h4 class="footer__section-title">TECNOLOGÍAS</h4>
          <span class="footer__link">HTML5</span>
          <span class="footer__link">CSS3</span>
          <span class="footer__link">Angular 17</span>
          <span class="footer__link">TypeScript</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #000; color: #fff; padding: 48px 0; }
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; gap: 60px; align-items: flex-start; }
    .footer__brand { flex-shrink: 0; }
    .footer__logo { font-size: 1.2rem; font-weight: 900; letter-spacing: 2px; font-style: italic; }
    .footer__col { display: flex; flex-direction: column; gap: 10px; }
    .footer__section-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; color: #fff; margin-bottom: 4px; }
    .footer__link { font-size: 0.7rem; color: #666; letter-spacing: 1px; text-decoration: none; }
  `]
})
export class FooterComponent {}
