import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model';
import { BranchCreateDto } from '../models/branch-create.dto';
import { BranchEditDto } from '../models/branch-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/branches`;

  constructor() { }
  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl);
  }
  addBranch(branch: BranchCreateDto): Observable<Branch> {
    return this.http.post<Branch>(this.baseUrl, branch);
  }
  updateBranch(id: number, branch: BranchEditDto): Observable<Branch> {
    return this.http.put<Branch>(`${this.baseUrl}/${id}`, branch);
  }
}
