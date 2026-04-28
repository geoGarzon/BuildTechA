// src/app/components/contacto/contacto.component.ts
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="contacto container">
      <div class="contacto__main">
        <h1 class="contacto__title">CONTÁCTANOS</h1>
        <p class="contacto__subtitle">ESTAMOS PARA AYUDARTE, DÉJANOS TUS DATOS Y TE CONTACTAREMOS.</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="contacto__form" novalidate>
          <!-- Nombre -->
          <div class="form-group" [class.error]="isInvalid('nombre')">
            <label class="form-label">NOMBRE</label>
            <input type="text" formControlName="nombre" class="form-input" placeholder="Tu nombre completo">
            @if (isInvalid('nombre')) {
              <span class="form-error">El nombre debe tener al menos 2 caracteres.</span>
            }
          </div>

          <!-- Email -->
          <div class="form-group" [class.error]="isInvalid('email')">
            <label class="form-label">EMAIL</label>
            <input type="email" formControlName="email" class="form-input" placeholder="correo@ejemplo.com">
            @if (isInvalid('email')) {
              <span class="form-error">Ingresa un email válido.</span>
            }
          </div>

          <!-- Asunto -->
          <div class="form-group" [class.error]="isInvalid('asunto')">
            <label class="form-label">ASUNTO</label>
            <select formControlName="asunto" class="form-input form-select">
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta de producto</option>
              <option value="soporte">Soporte técnico</option>
              <option value="cotizacion">Cotización</option>
              <option value="otro">Otro</option>
            </select>
            @if (isInvalid('asunto')) {
              <span class="form-error">Selecciona un asunto.</span>
            }
          </div>

          <!-- Mensaje -->
          <div class="form-group" [class.error]="isInvalid('mensaje')">
            <label class="form-label">MENSAJE</label>
            <textarea formControlName="mensaje" class="form-input form-textarea" placeholder="Escribe tu mensaje aquí..." rows="5"></textarea>
            @if (isInvalid('mensaje')) {
              <span class="form-error">El mensaje debe tener al menos 10 caracteres.</span>
            }
          </div>

          <button type="submit" class="btn btn--primary">ENVIAR</button>

          @if (submitted()) {
            <div class="form-success">✓ ¡Mensaje enviado con éxito! Te contactaremos pronto.</div>
          }
        </form>
      </div>

      <!-- Info lateral -->
      <aside class="contacto__info">
        <div class="info-block">
          <h3 class="info-title">VISÍTANOS</h3>
          <div class="info-item">
            <span class="info-city">MEDELLÍN</span>
            <span class="info-address">CR 68 C</span>
          </div>
          <div class="info-item">
            <span class="info-city">BOGOTÁ</span>
            <span class="info-address">Av Principal</span>
          </div>
          <div class="info-item">
            <span class="info-city">SANTA MARTA</span>
            <span class="info-address">Edif Maestre</span>
          </div>
        </div>
        <div class="info-block">
          <h3 class="info-title">SÍGUENOS EN REDES</h3>
          <div class="social-links">
            <a href="#" class="social-btn" aria-label="Twitter/X">𝕏</a>
            <a href="#" class="social-btn" aria-label="Instagram">◎</a>
            <a href="#" class="social-btn" aria-label="YouTube">▷</a>
          </div>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; }
    .contacto { display: grid; grid-template-columns: 1fr auto; gap: 80px; padding: 60px 40px; align-items: start; }
    .contacto__title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; font-style: italic; margin-bottom: 8px; }
    .contacto__subtitle { font-size: 0.65rem; letter-spacing: 2px; color: #999; margin-bottom: 40px; }

    /* Form */
    .contacto__form { display: flex; flex-direction: column; gap: 24px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group.error .form-input { border-color: #e63946; }
    .form-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 2px; color: #999; }
    .form-input { border: none; border-bottom: 1px solid #E8E8E8; padding: 12px 0; font-size: 0.9rem; font-family: inherit; background: transparent; color: #000; transition: border-color 0.2s; outline: none; }
    .form-input:focus { border-bottom-color: #000; }
    .form-select { cursor: pointer; }
    .form-textarea { resize: vertical; min-height: 120px; border: 1px solid #E8E8E8; padding: 12px; }
    .form-error { font-size: 0.7rem; color: #e63946; font-weight: 600; letter-spacing: 0.5px; }
    .form-success { background: #000; color: #fff; padding: 16px 24px; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; margin-top: 8px; }

    /* Button */
    .btn { display: inline-block; padding: 16px 40px; font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s; align-self: flex-start; }
    .btn--primary { background: #000; color: #fff; }
    .btn--primary:hover { background: #333; }

    /* Info sidebar */
    .contacto__info { display: flex; flex-direction: column; gap: 40px; min-width: 220px; padding-top: 80px; }
    .info-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; margin-bottom: 16px; }
    .info-item { display: flex; justify-content: space-between; gap: 24px; margin-bottom: 10px; }
    .info-city { font-size: 0.7rem; color: #999; letter-spacing: 1px; }
    .info-address { font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; }
    .social-links { display: flex; gap: 12px; }
    .social-btn { width: 36px; height: 36px; border: 1px solid #E8E8E8; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; color: #000; text-decoration: none; transition: all 0.2s; }
    .social-btn:hover { background: #000; color: #fff; border-color: #000; }
  `]
})
export class ContactoComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  isInvalid(field: string): boolean {
    const control: AbstractControl | null = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
      this.form.reset();
      setTimeout(() => this.submitted.set(false), 5000);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
