import { ProductStateType } from 'store/modules/Product/types';
import { CartStateType } from 'store/modules/Cart/types';
import { OrderStateType } from 'store/modules/Order/types';

export type RootStoreType = { product: ProductStateType, cart: CartStateType, order: OrderStateType };

export interface IProduct { _id: string, title: string, price: number, description?: string, image?: string };
export interface ICart { product: IProduct, count: number }
export interface IOrder { _id: string, cart: ICart[], email: string, name?: string, address?: string, total: number, taxRate: number }