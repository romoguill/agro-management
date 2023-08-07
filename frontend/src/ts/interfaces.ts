export interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
  roles: string[];
}

export enum MasterDataEntitys {
  SUPPLIERS = 'Suppliers',
  PRODUCTS = 'Products',
  CURRENCIES = 'Curriencies',
  FARM_PLOTS = 'Farm Plots',
  AGRICULTIRE = 'Agriculture',
}
