import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BranchProduct } from '../models/branch-product.model';
import { Branch } from '../../branches/models/branch.model';
import { BranchService } from '../../branches/services/branch.service';
import { BranchProductsService } from '../services/branch-products.service';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../products/models/product.model';

@Component({
  selector: 'app-branch-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './branch-products.component.html',
  styleUrl: './branch-products.component.css'
})
export class BranchProductsComponent implements OnInit {
  branches: Branch[] = [];
  products: Product[] = [];
  branchProducts: BranchProduct[] = [];
  selectedBranchId: number | null = null;

  showCreateModal = false;
  createDto = { productId: null, price: 0, stock: 0 };

  showEditModal = false;

  editDto: any = {};
  constructor(
    private branchService: BranchService,
    private branchProductsService: BranchProductsService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.branchService.getBranches().subscribe(data => {
      this.branches = data;
    });
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  onBranchChange(): void {
    if (this.selectedBranchId) {
      this.branchProductsService.getBranchProducts(this.selectedBranchId).subscribe(data => {
        this.branchProducts = data;
      });
    } else {
      this.branchProducts = [];
    }
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.createDto = { productId: null, price: 0, stock: 0 };
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createDto = { productId: null, price: 0, stock: 0 };
  }

  addBranchProduct(): void {
    if (!this.selectedBranchId || !this.createDto.productId) return;
    this.branchProductsService
      .addBranchProduct(this.selectedBranchId, this.createDto.productId, {
        price: this.createDto.price,
        stock: this.createDto.stock
      })
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.onBranchChange();
        }
      });
  }
  deleteBranchProduct(branchId: number, productId: number): void {
    if (confirm('¿Estás seguro de eliminar este producto de la sucursal?')) {
      this.branchProductsService.deleteBranchProduct(branchId, productId).subscribe({
        next: () => {
          this.onBranchChange(); // Refresca la lista
        }
      });
    }
  }

  openEditModal(bp: BranchProduct) {
    this.editDto = { ...bp }; // Copia todos los campos para mostrar y editar
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editDto = {};
  }

  updateBranchProduct() {
    this.branchProductsService
      .updateBranchProduct(this.editDto.branchId, this.editDto.productId, {
        price: this.editDto.price,
        stock: this.editDto.stock
      })
      .subscribe({
        next: () => {
          this.closeEditModal();
          this.onBranchChange();
        }
      });
  }

}
