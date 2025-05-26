import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Franchise } from '../models/franchise.model';
import { FranchiseCreateDto } from '../models/franchise-create.dto';
import { FranchiseEditDto } from '../models/franchise-edit.dto';
import { TopStockProduct } from '../models/top-stock-product';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/franchises`;

  constructor() { }

  getFranchises(): Observable<Franchise[]> {
    console.log(this.baseUrl);
    return this.http.get<Franchise[]>(this.baseUrl);
  }
  addFranchise(franchise: FranchiseCreateDto): Observable<Franchise> {
    return this.http.post<Franchise>(this.baseUrl, franchise);
  }
  updateFranchise(id: number, franchise: FranchiseEditDto): Observable<Franchise> {
    return this.http.put<Franchise>(`${this.baseUrl}/${id}`, franchise);
  }

  getTopStockProducts(franchiseId: number): Observable<TopStockProduct[]> {
  return this.http.get<TopStockProduct[]>(`${environment.apiUrl}/api/franchises/${franchiseId}/top-stock-products`);
}
}
