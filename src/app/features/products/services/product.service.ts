import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { ProductCreateDto } from '../models/product-create.dto';
import { ProductEditDto } from '../models/product-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/products`;

  constructor() { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  addProduct(product: ProductCreateDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }
  updateProduct(id: number, product: ProductEditDto): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }
}
