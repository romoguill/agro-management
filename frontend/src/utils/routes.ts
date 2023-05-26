import {
  FaChalkboard,
  FaFileInvoiceDollar,
  FaMapMarkedAlt,
} from 'react-icons/fa';

export interface RouteLink {
  displayName: string;
  path: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const routesApp: RouteLink[] = [
  {
    displayName: 'Dashboard',
    path: '/dashboard',
    Icon: FaChalkboard,
  },
  {
    displayName: 'Invoices',
    path: '/invoices',
    Icon: FaFileInvoiceDollar,
  },
  {
    displayName: 'Map',
    path: '/map',
    Icon: FaMapMarkedAlt,
  },
];
