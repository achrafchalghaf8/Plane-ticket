import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VoyageService } from 'src/services/voyage.service';
import { DestinationService } from 'src/services/destination.service';
import { Router } from '@angular/router';
import { Voyage } from 'src/models/voyage';
import { Destination } from 'src/models/destination';
import { VoyageModalComponent } from '../modals/voyage-modal/voyage-modal.component';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { PdfExportService } from '../../services/pdf-export.service';

@Component({
  selector: 'app-liste-voyage',
  templateUrl: './liste-voyage.component.html',
  styleUrls: ['./liste-voyage.component.css']
})
export class ListeVoyageComponent implements OnInit {
  voyages: Voyage[] = [];
  destinations: Destination[] = [];
  filteredVoyages: Voyage[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;

  constructor(
    private voyageService: VoyageService,
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
      this.voyages = voyages.map((voyage) => ({
        ...voyage,
        destinationNom: this.getDestinationName(voyage.destination_id)
      }));
      this.filteredVoyages = this.voyages;
      this.isLoading = false;
    });
  }

  getDestinationName(destinationId: number): string {
    const destination = this.destinations.find((d) => d.id === destinationId);
    return destination ? destination.nom : 'Inconnu';
  }

  filterVoyages() {
    const query = this.normalizeString(this.searchQuery);
    const keywords = query.split(/\s+/); // Découpe par espace

    this.filteredVoyages = this.voyages.filter(voyage => {
      const combinedFields = [
        voyage.datevoyage,
        voyage.nbplacetotal,
        voyage.prixplace,
        voyage.depart,
        voyage.destinationNom
      ]
        .map(value => this.normalizeValue(value))
        .join(' ');

      // Vérifie que tous les mots-clés sont présents dans les champs concaténés
      return keywords.every(word => combinedFields.includes(word));
    });
  }

  normalizeValue(value: any): string {
    if (value === null || value === undefined) return '';
    return this.normalizeString(String(value));
  }

  normalizeString(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')              // Supprime les accents
      .replace(/[\u0300-\u036f]/g, '') // Supprime les caractères accentués restants
      .trim();
  }


  openAddModal(): void {
    const dialogRef = this.dialog.open(VoyageModalComponent, {
      width: '500px',
      data: { voyage: null, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Voyage added, updating list:', result);
        // Rafraîchir la liste complète
        this.loadVoyages();
      }
    });
  }

  openEditModal(voyage: Voyage): void {
    const dialogRef = this.dialog.open(VoyageModalComponent, {
      width: '500px',
      data: { voyage: voyage, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Voyage updated, updating list:', result);
        // Rafraîchir la liste complète
        this.loadVoyages();
      }
    });
  }

  deleteVoyage(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Voulez-vous vraiment supprimer ce voyage ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.voyageService.deleteVoyage(id).subscribe(() => {
          this.voyages = this.voyages.filter(v => v.id !== id);
          this.filterVoyages();
        });
      }
    });
  }

  exportToPdf(): void {
    this.pdfExportService.exportVoyageList(this.filteredVoyages, 'Liste des Voyages');
  }
}
