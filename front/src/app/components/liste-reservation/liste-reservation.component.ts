import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/services/reservation.service';
import { VoyageService } from 'src/services/voyage.service';
import { UserService } from 'src/services/user.service';
import { DestinationService } from 'src/services/destination.service';
import { Reservation } from 'src/models/reservation';
import { User } from 'src/models/user';
import { Voyage } from 'src/models/voyage';
import { Destination } from 'src/models/destination';
import { ReservationModalComponent } from '../modals/reservation-modal/reservation-modal.component';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { PdfExportService } from '../../services/pdf-export.service';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  voyages: Voyage[] = [];
  users: User[] = [];
  destinations: Destination[] = [];
  filteredReservations: Reservation[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(
    private reservationService: ReservationService,
    private voyageService: VoyageService,
    private userService: UserService,
    private destinationService: DestinationService,
    private router: Router,
    private dialog: MatDialog,
    private pdfExportService: PdfExportService
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.destinationService.getDestinations().subscribe((destinations) => {
      this.destinations = destinations;
      this.loadVoyages();
    });
  }

  loadVoyages(): void {
    this.voyageService.getVoyages().subscribe((voyages) => {
      this.voyages = voyages.map(voyage => ({
        ...voyage,
        destinationNom: this.getDestinationName(voyage.destination_id)
      }));
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loadReservations();
    });
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;
      this.filteredReservations = data; // Initialisation du tableau filtré
      this.isLoading = false;
    });
  }

  getDestinationName(destinationId: number): string {
    const destination = this.destinations.find(d => d.id === destinationId);
    return destination ? destination.nom : 'Inconnu';
  }

  getVoyageName(idVoyage: number): string {
    const voyage = this.voyages.find(v => v.id === idVoyage);
    return voyage ? `${voyage.depart} → ${voyage.destinationNom} (${voyage.datevoyage})` : 'Inconnu';
  }

  getUserName(idUser: number): string {
    const user = this.users.find(u => u.id === idUser);
    return user ? `${user.name} (${user.email})` : 'Inconnu';
  }

  filterReservations(): void {
    const queryWords = this.searchQuery.toLowerCase().split(' ').filter(word => word.trim() !== '');

    this.filteredReservations = this.reservations.filter(reservation => {
      // Création d'une seule string avec tous les champs
      const combined = [
        reservation.id.toString(),
        this.getVoyageName(reservation.idVoyage),
        this.getUserName(reservation.idUser),
        reservation.nbPlaceAReserver.toString()
      ].join(' ').toLowerCase();

      // Chaque mot de la requête doit être trouvé dans la chaîne combinée
      return queryWords.every(word => combined.includes(word));
    });
  }


  openAddModal(): void {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '500px',
      data: { reservation: null, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation added, updating list:', result);
        // Rafraîchir la liste complète
        this.loadReservations();
      }
    });
  }

  openEditModal(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '500px',
      data: { reservation: reservation, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation updated, updating list:', result);
        // Rafraîchir la liste complète
        this.loadReservations();
      }
    });
  }

  deleteReservation(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Voulez-vous vraiment supprimer cette réservation ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.deleteReservation(id).subscribe(() => {
          this.reservations = this.reservations.filter(res => res.id !== id);
          this.filterReservations();
        });
      }
    });
  }

  exportToPdf(): void {
    // Préparer les données pour l'exportation
    const reservationsForExport = this.filteredReservations.map(reservation => {
      return {
        ...reservation,
        voyageName: this.getVoyageName(reservation.idVoyage),
        userName: this.getUserName(reservation.idUser)
      };
    });

    this.pdfExportService.exportReservationList(reservationsForExport, 'Liste des Réservations');
  }
}
