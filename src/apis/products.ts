import { IProductResponse } from "../domain/shopping-cart/types";
import fetcher from "../utils/fetcher";
import { API_URL } from "./constants";

export async function getProducts() {
  return (await fetcher.get(API_URL.PRODUCTS)) as IProductResponse;
}
