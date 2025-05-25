import { Component, OnInit } from '@angular/core';
import { FranchiseService } from '../service/franchise.service';
import { Franchise } from '../models/franchise.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FranchiseCreateDto } from '../models/franchise-create.dto';
import { FranchiseEditDto } from '../models/franchise-edit.dto';

@Component({
  selector: 'app-franchises',
  imports: [CommonModule, FormsModule],
  templateUrl: './franchises.component.html',
  styleUrl: './franchises.component.css'
})
export class FranchisesComponent implements OnInit {
  franchises: Franchise[] = [];
  showModal = false;
  showEditModal = false;

  createDto: FranchiseCreateDto = { name: '' };
  editDto: FranchiseEditDto = { name: '' };
  selectedFranchise: Franchise | null = null;

  constructor(private franchiseService: FranchiseService) {}

  ngOnInit(): void {
    this.loadFranchises();
  }

  loadFranchises(): void {
    this.franchiseService.getFranchises().subscribe(data => {
      this.franchises = data;
    });
  }

  addFranchise(): void {
    if (!this.createDto.name.trim()) return;
    this.franchiseService.addFranchise(this.createDto).subscribe({
      next: () => {
        this.closeModal();
        this.loadFranchises();
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.createDto = { name: '' };
  }

  openEditModal(franchise: Franchise): void {
    this.selectedFranchise = { ...franchise };
    this.editDto = { name: franchise.name };
    this.showEditModal = true;
  }

  updateFranchise(): void {
    if (!this.selectedFranchise || !this.editDto.name.trim()) return;
    this.franchiseService
      .updateFranchise(this.selectedFranchise.id, this.editDto)
      .subscribe({
        next: () => {
          this.closeEditModal();
          this.loadFranchises();
        }
      });
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedFranchise = null;
    this.editDto = { name: '' };
  }
}
