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

export enum EntityStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum SupplierCategories {
  SEEDS = 'Seeds',
  FERTILIZERS = 'Fertilizers',
  HERBICIDES = 'Herbicides',
  PESTICIDES = 'Pesticides',
  LABOR = 'Labor',
}

export type Supplier = {
  avatarUrl: string;
  category: SupplierCategories[];
  cuit: string;
  description: string;
  name: string;
  phone: string;
  status: EntityStatus;
  website: string;
};

export type SupplierWithId = Supplier & {
  _id: string;
};
