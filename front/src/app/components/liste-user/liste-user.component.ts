import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { PdfExportService } from '../../services/pdf-export.service';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private pdfExportService: PdfExportService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.isLoading = false;
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: { user: null, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User added, updating list:', result);
        // Ajouter le nouvel utilisateur à la liste et rafraîchir
        this.loadUsers();
      }
    });
  }

  openEditModal(user: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: { user: user, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User updated, updating list:', result);
        // Rafraîchir la liste complète pour s'assurer que tout est à jour
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Voulez-vous vraiment supprimer cet utilisateur ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          this.users = this.users.filter(user => user.id !== id);
          this.filterUsers();
        });
      }
    });
  }

  exportToPdf(): void {
    this.pdfExportService.exportUserList(this.filteredUsers, 'Liste des Utilisateurs');
  }
}
