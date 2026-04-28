// src/app/components/header/header.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/" class="header__logo">BUILDTECH</a>
        <nav class="header__nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="header__nav-link">HOME</a>
          <a routerLink="/catalogo" routerLinkActive="active" class="header__nav-link">CATÁLOGO</a>
          <a routerLink="/favoritos" routerLinkActive="active" class="header__nav-link">FAVORITOS</a>
          <a routerLink="/contacto" routerLinkActive="active" class="header__nav-link">CONTACTO</a>
        </nav>
        <div class="header__actions">
          <a routerLink="/favoritos" class="header__fav-link" aria-label="Ver favoritos">
            <svg class="header__fav-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            @if (favCount() > 0) {
              <span class="header__fav-badge">{{ favCount() }}</span>
            }
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 1px solid #E8E8E8; height: 72px; display: flex; align-items: center; }
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; gap: 40px; }
    .header__logo { font-size: 1.25rem; font-weight: 900; letter-spacing: 2px; color: #000; text-decoration: none; font-style: italic; }
    .header__nav { display: flex; gap: 32px; margin-left: auto; }
    .header__nav-link { font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; color: #999; text-decoration: none; transition: color 0.2s; }
    .header__nav-link:hover, .header__nav-link.active { color: #000; border-bottom: 2px solid #000; padding-bottom: 2px; }
    .header__actions { display: flex; align-items: center; margin-left: 32px; }
    .header__fav-link { position: relative; display: flex; align-items: center; color: #000; }
    .header__fav-icon { width: 22px; height: 22px; fill: none; stroke: currentColor; }
    .header__fav-badge { position: absolute; top: -8px; right: -10px; background: #000; color: #fff; font-size: 0.6rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  `]
})
export class HeaderComponent {
  private favService = inject(FavoritesService);
  favCount = this.favService.count;
}
