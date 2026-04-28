# BuildTech - Angular 17

Catálogo web de componentes para PC, desarrollado con Angular 17 como parte de la Entrega Final del curso Front-End.

## 🚀 Tecnologías

- **Angular 17** – Framework principal (componentes standalone)
- **TypeScript** – Tipado estático
- **Angular Signals** – Estado reactivo (`signal()`, `computed()`)
- **Angular Router** – Navegación SPA con lazy loading
- **ReactiveFormsModule** – Validación de formularios
- **LocalStorage** – Persistencia de favoritos

## 📁 Estructura

```
src/app/
├── models/         → Interfaces (Product, Category)
├── services/       → ProductService, FavoritesService
└── components/
    ├── header/     → Navegación + badge reactivo de favoritos
    ├── footer/     → Pie de página
    ├── home/       → Página principal con hero y productos destacados
    ├── catalogo/   → Listado filtrable por categoría
    ├── producto/   → Vista detallada del producto
    ├── favoritos/  → Lista de favoritos con eliminación
    └── contacto/   → Formulario con validación reactiva
```

## ⚙️ Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4200)
npm start

# Build para producción
npm run build
```

## 🌐 Despliegue en GitHub Pages

```bash
# 1. Instalar herramienta
npm install -g angular-cli-ghpages

# 2. Build con base-href del repositorio
ng build --base-href /BuildTech/

# 3. Desplegar
npx angular-cli-ghpages --dir=dist/buildtech-angular/browser
```

## 👥 Desarrolladores

- Junior Mosquera Mosquera
- Samuel Duque Porras
- Daniel Alfonzo González Pérez
- Georgette Garzón Burgos

**Institución:** Politécnico Grancolombiano – 2026
