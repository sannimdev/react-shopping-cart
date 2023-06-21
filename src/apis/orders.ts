import { IOrderResponse } from "../domain/types";
import fetcher from "../utils/fetcher";

export async function requestMyOrders() {
  try {
    return fetcher.get<IOrderResponse>("/api/orders");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
