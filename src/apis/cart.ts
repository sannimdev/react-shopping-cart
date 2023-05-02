import { ICartResponse } from "../domain/shopping-cart/types/response";
import fetcher from "../utils/fetcher";
import { API_URL } from "./constants";

export async function getProductsInCart({ page = 1, unit = 20 }) {
  const params = new URLSearchParams({ page: page.toString(), unit: unit.toString() });
  const URL = `${API_URL.CART}?${params.toString()}`;
  const response = (await fetcher.get(URL)) as ICartResponse;
  return response;
}
