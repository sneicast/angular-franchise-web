import { Component, OnInit } from '@angular/core';
import { Branch } from '../models/branch.model';
import { BranchService } from '../services/branch.service';
import { BranchCreateDto } from '../models/branch-create.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Franchise } from '../../franchises/models/franchise.model';
import { FranchiseService } from '../../franchises/service/franchise.service';
import { BranchEditDto } from '../models/branch-edit.dto';

@Component({
  selector: 'app-branches',
  imports: [CommonModule, FormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {

  branches: Branch[] = [];
  franchises: Franchise[] = [];
  showCreateModal = false;
  createDto: BranchCreateDto = { name: '', status: true, franchiseId: 0 };

  showEditModal = false;
  selectedBranch: Branch | null = null;
  editDto: BranchEditDto = { name: '', status: true };

  constructor(private branchService: BranchService, private franchiseService: FranchiseService) { }

  ngOnInit(): void {
    this.loadBranches();
    this.loadFranchises();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe(data => {
      this.branches = data;
    });
  }

  loadFranchises(): void {
    this.franchiseService.getFranchises().subscribe(data => {
      this.franchises = data;
    });
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.createDto = { name: '', status: true, franchiseId: 0 };
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createDto = { name: '', status: true, franchiseId: 0 };
  }

  addBranch(): void {
    if (!this.createDto.name.trim() || !this.createDto.franchiseId) return;
    this.branchService.addBranch(this.createDto).subscribe({
      next: () => {
        this.closeCreateModal();
        this.loadBranches();
      }
    });
  }

  openEditModal(branch: Branch): void {
    this.selectedBranch = branch;
    this.editDto = { name: branch.name, status: branch.status };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedBranch = null;
    this.editDto = { name: '', status: true };
  }

  updateBranch(): void {
    if (!this.selectedBranch) return;
    this.branchService.updateBranch(this.selectedBranch.id, this.editDto).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadBranches();
      }
    });
  }

}
