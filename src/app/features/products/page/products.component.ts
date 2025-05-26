import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductCreateDto } from '../models/product-create.dto';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductEditDto } from '../models/product-edit.dto';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showCreateModal = false;
  showEditModal = false;
  createDto: ProductCreateDto = { name: '', status: true };
   editDto: ProductEditDto = { name: '', status: true };
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (!this.createDto.name.trim()) return;
    this.productService.addProduct(this.createDto).subscribe({
      next: () => {
        this.closeCreateModal();
        this.loadProducts();
      }
    });
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createDto = { name: '', status: true };
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.editDto = { name: product.name, status: product.status };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedProduct = null;
    this.editDto = { name: '', status: true };
  }

  updateProduct(): void {
    if (!this.selectedProduct) return;
    this.productService.updateProduct(this.selectedProduct.id, this.editDto).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadProducts();
      }
    });
  }

}
