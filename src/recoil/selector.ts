import { selector } from "recoil";
import { cartState } from "./atoms";
import { CART } from "../domain/constants";

export const estimatedPriceSelector = selector({
  key: "estimatedPriceState",
  get: ({ get }) => {
    const cart = get(cartState);

    return (
      cart.items?.reduce(
        (result, { product: { checked, price, quantity = CART.PRODUCTS.DEFAULT_INITIAL_QUANTITY } }) =>
          checked ? result + price * quantity : result,
        0
      ) || 0
    );
  },
});
