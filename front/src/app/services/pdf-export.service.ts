import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  exportVoyageList(voyages: any[], title: string = 'Liste des Voyages'): void {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Date d'exportation
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Exporté le ${new Date().toLocaleDateString()}`, 14, 30);

    // Tableau
    const tableColumn = ["ID", "Date", "Places", "Prix", "Départ", "Destination"];
    const tableRows: any[] = [];

    voyages.forEach(voyage => {
      const voyageData = [
        voyage.id,
        voyage.datevoyage,
        voyage.nbplacetotal,
        `${voyage.prixplace} €`,
        voyage.depart,
        voyage.destinationNom || 'N/A'
      ];
      tableRows.push(voyageData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [44, 62, 80],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [241, 245, 249],
      },
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  exportReservationList(reservations: any[], title: string = 'Liste des Réservations'): void {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Date d'exportation
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Exporté le ${new Date().toLocaleDateString()}`, 14, 30);

    // Tableau
    const tableColumn = ["ID", "Voyage", "Client", "Places Réservées"];
    const tableRows: any[] = [];

    reservations.forEach(reservation => {
      const reservationData = [
        reservation.id,
        reservation.voyageName || 'N/A',
        reservation.userName || 'N/A',
        reservation.nbPlaceAReserver
      ];
      tableRows.push(reservationData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [44, 62, 80],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [241, 245, 249],
      },
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  exportDestinationList(destinations: any[], title: string = 'Liste des Destinations'): void {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Date d'exportation
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Exporté le ${new Date().toLocaleDateString()}`, 14, 30);

    // Tableau
    const tableColumn = ["ID", "Nom", "Description"];
    const tableRows: any[] = [];

    destinations.forEach(destination => {
      const destinationData = [
        destination.id,
        destination.nom,
        destination.description.substring(0, 50) + (destination.description.length > 50 ? '...' : '')
      ];
      tableRows.push(destinationData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [44, 62, 80],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [241, 245, 249],
      },
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  exportUserList(users: any[], title: string = 'Liste des Utilisateurs'): void {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Date d'exportation
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Exporté le ${new Date().toLocaleDateString()}`, 14, 30);

    // Tableau
    const tableColumn = ["ID", "Nom", "Email", "Rôle", "Statut"];
    const tableRows: any[] = [];

    users.forEach(user => {
      const userData = [
        user.id,
        user.name,
        user.email,
        user.role,
        user.isActive ? 'Actif' : 'Inactif'
      ];
      tableRows.push(userData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [44, 62, 80],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [241, 245, 249],
      },
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
