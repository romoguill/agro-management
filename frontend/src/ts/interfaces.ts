export interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
  roles: string[];
}

export enum MasterDataEntities {
  SUPPLIERS = 'Suppliers',
  PRODUCTS = 'Products',
  CURRENCIES = 'Curriencies',
  FARM_PLOTS = 'Farm Plots',
  AGRICULTIRE = 'Agriculture',
}

export enum SupplierCategories {
  SEEDS = 'Seeds',
  FERTILIZERS = 'Fertilizers',
  HERBICIDES = 'Herbicides',
  PETICIDES = 'Pesticides',
  LABOR = 'Labor',
}
