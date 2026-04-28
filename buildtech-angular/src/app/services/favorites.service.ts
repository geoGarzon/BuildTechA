// src/app/services/favorites.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'buildtech_favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  // Signal reactivo para la lista de favoritos
  private favoritesSignal = signal<Product[]>(this.loadFromStorage());

  // Computed signals
  readonly favorites = computed(() => this.favoritesSignal());
  readonly count = computed(() => this.favoritesSignal().length);

  private loadFromStorage(): Product[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSignal().some(p => p.id === productId);
  }

  addFavorite(product: Product): boolean {
    if (!this.isFavorite(product.id)) {
      const updated = [...this.favoritesSignal(), product];
      this.favoritesSignal.set(updated);
      this.saveToStorage(updated);
      return true;
    }
    return false;
  }

  removeFavorite(productId: number): void {
    const updated = this.favoritesSignal().filter(p => p.id !== productId);
    this.favoritesSignal.set(updated);
    this.saveToStorage(updated);
  }

  toggleFavorite(product: Product): 'added' | 'removed' {
    if (this.isFavorite(product.id)) {
      this.removeFavorite(product.id);
      return 'removed';
    } else {
      this.addFavorite(product);
      return 'added';
    }
  }
}
