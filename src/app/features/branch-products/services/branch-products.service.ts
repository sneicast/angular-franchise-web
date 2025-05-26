import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BranchProduct } from '../models/branch-product.model';
import { Observable } from 'rxjs';
import { BranchProductCreateDto } from '../models/branch-product-create.dto';
import { BranchProductEditDto } from '../models/branch.product.edit.dto';

@Injectable({
  providedIn: 'root'
})
export class BranchProductsService {

  private http = inject(HttpClient);
  constructor() { }

 getBranchProducts(branchId: number): Observable<BranchProduct[]> {
    return this.http.get<BranchProduct[]>(`${environment.apiUrl}/api/branches/${branchId}/products`);
  }
 
  addBranchProduct(branchId: number, productId: number, dto: BranchProductCreateDto): Observable<BranchProduct> {
  return this.http.post<BranchProduct>(
    `${environment.apiUrl}/api/branches/${branchId}/products/${productId}`,
    dto
  );
}
  updateBranchProduct(branchId: number, productId: number, dto: BranchProductEditDto): Observable<BranchProduct> {
    return this.http.put<BranchProduct>(
      `${environment.apiUrl}/api/branches/${branchId}/products/${productId}`,
      dto
    );
  }

  deleteBranchProduct(branchId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/branches/${branchId}/products/${productId}`);
  }

}
