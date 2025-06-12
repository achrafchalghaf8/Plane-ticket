import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  adminName: string = '';
  searchQuery: string = '';
  isSidebarCollapsed: boolean = false;
  isMobile: boolean = false;
  showMobileSearch: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Get user info
    const user = this.authService.getUser();
    if (user) {
      this.adminName = user.name;
    }

    // Check screen size
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));

    // Subscribe to sidebar state changes
    this.subscription.add(
      this.sidebarService.isCollapsed$.subscribe(collapsed => {
        this.isSidebarCollapsed = collapsed;
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and event listeners
    this.subscription.unsubscribe();
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  search(): void {
    if (this.searchQuery.trim()) {
      // Determine which page to navigate to based on the current route
      const currentUrl = this.router.url;

      if (currentUrl.includes('/voyages')) {
        this.router.navigate(['/voyages'], { queryParams: { search: this.searchQuery } });
      } else if (currentUrl.includes('/reservations')) {
        this.router.navigate(['/reservations'], { queryParams: { search: this.searchQuery } });
      } else if (currentUrl.includes('/users')) {
        this.router.navigate(['/users'], { queryParams: { search: this.searchQuery } });
      } else if (currentUrl.includes('/destinations')) {
        this.router.navigate(['/destinations'], { queryParams: { search: this.searchQuery } });
      } else {
        // Default to dashboard if we're on another page
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }

  toggleSearch(): void {
    this.showMobileSearch = !this.showMobileSearch;
  }

  closeMobileSearch(): void {
    this.showMobileSearch = false;
    this.searchQuery = '';
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  logout(): void {
    this.authService.logout();
  }
}
