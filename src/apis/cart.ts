import axios from "axios";
import { ICart, ICartItem, IProduct } from "../domain/types";
import { API_URL } from "./endpoints";
import { ICartResponse, IRequestPaging } from "../domain/types/response";
import fetcher from "../utils/fetcher";

export async function requestDeleteItems(items: ICartItem[]): Promise<boolean> {
  try {
    const response = await fetcher.delete<{ status: number }>(API_URL.CART, { data: { items } });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function requestAddItem(product: IProduct): Promise<boolean> {
  try {
    const response = await fetcher.post<{ status: number }>(API_URL.CART, product);
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function requestCartItems({ page = 1, unit = 2_999_999_9999_999 }: IRequestPaging) {
  try {
    const params = new URLSearchParams({ page: page.toString(), unit: unit.toString() });
    return fetcher.get<ICartResponse>(`${API_URL.CART}?${params.toString()}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
