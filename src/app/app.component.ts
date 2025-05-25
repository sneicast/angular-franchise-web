import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'franchise';
  activeMenuItem: string = 'franquicias';
  menuItems: MenuItem[] = [
    { id: 'franquicias', label: 'Franquicias', icon: 'fas fa-store', path: '/franchise' },
    { id: 'sucursales', label: 'Sucursales', icon: 'fas fa-building', path: '/branches' },
    { id: 'productos', label: 'Productos', icon: 'fas fa-box', path: '/products' }
  ];

  constructor(private router: Router) {}

  selectMenuItem(itemId: string): void {
    this.activeMenuItem = itemId;
    this.navigateTo(itemId);
  }
 navigateTo(itemId: string): void {
  const menuItem = this.menuItems.find(item => item.id === itemId);
  const route = menuItem ? menuItem.path : '/franchise';
  this.router.navigate([route]);
}
  getMenuItemClass(itemId: string): string {
    const baseClass = 'w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200';
    const activeClass = 'bg-blue-100 text-blue-700 border-r-2 border-blue-500';
    const inactiveClass = 'text-gray-700 hover:bg-blue-50 hover:text-blue-700';

    return this.activeMenuItem === itemId
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${inactiveClass}`;
  }

  getActiveMenuLabel(): string {
    const activeItem = this.menuItems.find(item => item.id === this.activeMenuItem);
    return activeItem ? activeItem.label : '';
  }
}
