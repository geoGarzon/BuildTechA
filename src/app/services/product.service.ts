// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCTS: Product[] = [
    // ---- PROCESADORES ----
    {
      id: 1, name: 'AMD Ryzen 5 9800X', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '8 NÚCLEOS / 4.7GHZ', price: 1299.00, cores: 8, threads: 16, clock: '4.7 Ghz',
      description: 'El AMD Ryzen 5 9800X ofrece rendimiento excepcional para gaming y productividad. Con su arquitectura Zen 5, proporciona una experiencia fluida en multitarea y juegos exigentes.',
      fullDescription: 'El procesador AMD Ryzen 5 9800X representa la nueva generación de rendimiento para gamers y creadores de contenido. Equipado con 8 núcleos y 16 hilos de procesamiento basados en la arquitectura Zen 5, este procesador ofrece velocidades de reloj base de 4.7 GHz con capacidad de boost hasta 5.2 GHz.',
      image: 'assets/proc1.png'
    },
    {
      id: 2, name: 'AMD Ryzen 9 9900X', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '12 NÚCLEOS / 4.4GHZ', price: 2100.00, cores: 12, threads: 24, clock: '4.4 Ghz',
      description: 'El AMD Ryzen 9 9900X es la potencia definitiva para creadores y gamers que exigen lo máximo. Arquitectura Zen 5 de última generación.',
      fullDescription: 'El AMD Ryzen 9 9900X redefine los límites del rendimiento en escritorio. Con 12 núcleos y 24 hilos, este procesador domina tanto en cargas de trabajo de un solo hilo como en aplicaciones altamente paralelas.',
      image: 'assets/proc2.png'
    },
    {
      id: 3, name: 'Intel Core Ultra 9', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '24 NÚCLEOS / 3.7GHZ', price: 2499.00, cores: 24, threads: 32, clock: '3.7 Ghz',
      description: 'Alto rendimiento para gaming y productividad avanzada. Arquitectura con IA incorporada.',
      fullDescription: 'El Intel Core Ultra 9 es el procesador más avanzado de Intel, diseñado para ofrecer potencia extrema con inteligencia artificial integrada. Con 24 núcleos y 32 hilos.',
      image: 'assets/proc3.png'
    },
    {
      id: 4, name: 'AMD Ryzen 7 9700X', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '8 NÚCLEOS / 3.8GHZ', price: 1599.00, cores: 8, threads: 16, clock: '3.8 Ghz',
      description: 'Rendimiento equilibrado para gaming y productividad con eficiencia energética líder en su clase.',
      fullDescription: 'El AMD Ryzen 7 9700X ofrece el equilibrio perfecto entre rendimiento y eficiencia. Con 8 núcleos de alto rendimiento basados en Zen 5.',
      image: 'assets/proc4.png'
    },
    {
      id: 5, name: 'Intel Core i7-14700K', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '20 NÚCLEOS / 3.4GHZ', price: 1899.00, cores: 20, threads: 28, clock: '3.4 Ghz',
      description: 'Procesador desbloqueado de 14ª generación con rendimiento excepcional para gaming y streaming simultáneo.',
      fullDescription: 'El Intel Core i7-14700K combina 20 núcleos y 28 hilos para ofrecer un rendimiento sobresaliente tanto en juegos como en tareas de productividad intensivas.',
      image: 'assets/proc5.png'
    },
    {
      id: 6, name: 'AMD Ryzen 5 7600X', category: 'procesadores', categoryLabel: 'PROCESADOR',
      spec: '6 NÚCLEOS / 4.7GHZ', price: 899.00, cores: 6, threads: 12, clock: '4.7 Ghz',
      description: 'La opción más accesible para gaming competitivo con velocidades de reloj impresionantes.',
      fullDescription: 'El AMD Ryzen 5 7600X es la puerta de entrada al gaming de alto rendimiento. Con 6 núcleos y 12 hilos a velocidades de hasta 5.3 GHz en boost.',
      image: 'assets/proc6.png'
    },
    // ---- BOARDS ----
    {
      id: 7, name: 'Gigabyte B850 Gaming WiFi6', category: 'boards', categoryLabel: 'BOARD',
      spec: 'AM5 / DDR5', price: 449.00, cores: null, threads: null, clock: null,
      description: 'Board gaming con WiFi 6 integrado, soporte DDR5 y diseño duradero para builds de alto rendimiento.',
      fullDescription: 'La Gigabyte B850 Gaming WiFi6 es una placa base diseñada para gamers y entusiastas que buscan una base sólida para su build. Con soporte para procesadores AMD AM5.',
      image: 'assets/board1.png'
    },
    {
      id: 8, name: 'ASUS ROG Strix B650-A', category: 'boards', categoryLabel: 'BOARD',
      spec: 'AM5 / DDR5', price: 399.00, cores: null, threads: null, clock: null,
      description: 'Board con diseño ROG premium, PCIe 5.0 y refrigeración mejorada.',
      fullDescription: 'La ASUS ROG Strix B650-A combina estética premium con funcionalidad de alto rendimiento. Su diseño la hace ideal para builds temáticos.',
      image: 'assets/board2.png'
    },
    {
      id: 9, name: 'MSI MAG B760 Tomahawk', category: 'boards', categoryLabel: 'BOARD',
      spec: 'LGA1700 / DDR5', price: 349.00, cores: null, threads: null, clock: null,
      description: 'Board robusta para Intel con excelente entrega de energía y múltiples slots M.2.',
      fullDescription: 'La MSI MAG B760 Tomahawk WiFi es una placa base para Intel de 12ª y 13ª generación con un diseño robusto y funcionalidades de gaming avanzadas.',
      image: 'assets/board3.png'
    },
    // ---- MEMORIAS RAM ----
    {
      id: 10, name: 'Crucial Pro DDR5 32GB', category: 'memorias', categoryLabel: 'MEMORIA',
      spec: 'DDR5 / 5600MHZ', price: 259.00, cores: null, threads: null, clock: null,
      description: 'Kit de memoria DDR5 de alto rendimiento para gaming y productividad.',
      fullDescription: 'El kit Crucial Pro DDR5 de 32GB (2x16GB) a 5600MHz ofrece velocidades excepcionales para las plataformas más modernas. Con perfiles XMP 3.0.',
      image: 'assets/ram1.png'
    },
    {
      id: 11, name: 'Pack 16GB Crucial', category: 'memorias', categoryLabel: 'MEMORIA',
      spec: 'DDR5 / 4800MHZ', price: 240.00, cores: null, threads: null, clock: null,
      description: 'Kit de 16GB DDR5 ideal para builds básicos y gaming a 1080p.',
      fullDescription: 'Pack de memorias Crucial 16GB (2x8GB) DDR5-4800. Velocidad estándar JEDEC con bajo consumo energético.',
      image: 'assets/ram2.png'
    },
    {
      id: 12, name: 'Corsair Vengeance DDR5 32GB', category: 'memorias', categoryLabel: 'MEMORIA',
      spec: 'DDR5 / 6000MHZ', price: 320.00, cores: null, threads: null, clock: null,
      description: 'Memoria de alto rendimiento con iluminación RGB dinámica y perfiles XMP 3.0.',
      fullDescription: 'Kit Corsair Vengeance DDR5 32GB (2x16GB) a 6000MHz con iluminación RGB personalizable.',
      image: 'assets/ram1.png'
    },
    // ---- ALMACENAMIENTO ----
    {
      id: 13, name: 'Samsung 990 Pro 2TB', category: 'almacenamiento', categoryLabel: 'ALMACENAMIENTO',
      spec: 'NVME / 7450MB/S', price: 389.00, cores: null, threads: null, clock: null,
      description: 'SSD NVMe PCIe 4.0 con velocidades de lectura de hasta 7450 MB/s.',
      fullDescription: 'El Samsung 990 Pro 2TB es el SSD NVMe definitivo para gaming y creación de contenido.',
      image: 'assets/ssd1.png'
    },
    {
      id: 14, name: 'WD Black SN850X 1TB', category: 'almacenamiento', categoryLabel: 'ALMACENAMIENTO',
      spec: 'NVME / 7300MB/S', price: 199.00, cores: null, threads: null, clock: null,
      description: 'SSD gaming de alto rendimiento con tecnología Game Mode 2.0.',
      fullDescription: 'El WD_BLACK SN850X de 1TB ofrece velocidades de hasta 7300 MB/s con un diseño optimizado para gaming.',
      image: 'assets/ssd1.png'
    },
    // ---- REFRIGERACIÓN ----
    {
      id: 15, name: 'NZXT Kraken X63', category: 'refrigeracion', categoryLabel: 'REFRIGERACIÓN',
      spec: 'LIQUIDA / 280MM', price: 299.00, cores: null, threads: null, clock: null,
      description: 'Refrigeración líquida AIO con display LCD personalizable y rendimiento silencioso.',
      fullDescription: 'El NZXT Kraken X63 es un sistema de refrigeración líquida todo en uno de 280mm con un radiador de alto rendimiento.',
      image: 'assets/cooler1.png'
    },
    // ---- FUENTES DE PODER ----
    {
      id: 16, name: 'Fuente 650W 80+ Gold', category: 'fuentes', categoryLabel: 'FUENTE DE PODER',
      spec: '650W / 80+ GOLD', price: 240.00, cores: null, threads: null, clock: null,
      description: 'Fuente de poder modular con certificación 80+ Gold para máxima eficiencia.',
      fullDescription: 'Fuente de alimentación de 650W con certificación 80 Plus Gold y diseño completamente modular.',
      image: 'assets/psu1.png'
    },
    // ---- CHASIS ----
    {
      id: 17, name: 'NZXT H510 Elite', category: 'chasis', categoryLabel: 'CHASIS',
      spec: 'ATX / VIDRIO TEMPLADO', price: 349.00, cores: null, threads: null, clock: null,
      description: 'Case premium con panel de vidrio templado y gestión de cables integrada.',
      fullDescription: 'El NZXT H510 Elite es un chasis ATX mid-tower con doble panel de vidrio templado.',
      image: 'assets/case1.png'
    },
    // ---- FANS ----
    {
      id: 18, name: 'Fan Custom RGB 120mm', category: 'fans', categoryLabel: 'FAN',
      spec: '120MM / RGB ARGB', price: 240.00, cores: null, threads: null, clock: null,
      description: 'Pack de ventiladores RGB de 120mm con control ARGB y funcionamiento silencioso.',
      fullDescription: 'Pack de 3 ventiladores de 120mm con iluminación ARGB personalizable.',
      image: 'assets/cooler1.png'
    },
    // ---- GPU ----
    {
      id: 19, name: 'RTX 5060 OC', category: 'procesadores', categoryLabel: 'GPU',
      spec: '12GB GDDR7 / OC', price: 599.00, cores: null, threads: null, clock: null,
      description: 'Tarjeta gráfica con 12GB GDDR7 y overclock de fábrica para gaming 1440p.',
      fullDescription: 'La RTX 5060 OC ofrece rendimiento excepcional en 1440p con ray tracing y DLSS 4.0.',
      image: 'assets/gpu1.png'
    },
    {
      id: 20, name: 'Board B50M', category: 'boards', categoryLabel: 'BOARD',
      spec: 'AM5 / MICRO-ATX', price: 240.00, cores: null, threads: null, clock: null,
      description: 'Board micro-ATX compacta con soporte AM5 para builds de factor pequeño.',
      fullDescription: 'La Board B50M ofrece todas las características esenciales en un factor de forma micro-ATX.',
      image: 'assets/board3.png'
    }
  ];

  readonly CATEGORIES: Category[] = [
    { id: 'procesadores', label: 'PROCESADORES' },
    { id: 'boards', label: 'BOARDS' },
    { id: 'memorias', label: 'MEMORIAS RAM' },
    { id: 'almacenamiento', label: 'ALMACENAMIENTO' },
    { id: 'refrigeracion', label: 'REFRIGERACIÓN' },
    { id: 'fuentes', label: 'FUENTES DE PODER' },
    { id: 'chasis', label: 'CHASIS' },
    { id: 'fans', label: 'FANS' }
  ];

  getAllProducts(): Product[] {
    return this.PRODUCTS;
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.PRODUCTS.filter(p => p.category === categoryId);
  }

  getProductById(id: number): Product | undefined {
    return this.PRODUCTS.find(p => p.id === id);
  }

  getCategories(): Category[] {
    return this.CATEGORIES;
  }

  getFeaturedProducts(count = 6): Product[] {
    return this.PRODUCTS.slice(0, count);
  }
}
