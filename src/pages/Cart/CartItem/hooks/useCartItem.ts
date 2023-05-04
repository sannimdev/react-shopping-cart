import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { useCartContext } from "../../../../context/CartContext";
import { CART } from "../../../../domain/shopping-cart/constants";
import { ICart, ICartItem } from "../../../../domain/shopping-cart/types/domain";
import { API_URL } from "../../../../apis/constants";

const {
  PRODUCT: { AMOUNT_UNIT },
} = CART;

const useCartItem = ({ item: { id, product } }: { item: ICartItem }) => {
  // const { cart } = useCartContext();
  const { price, amount = 1 } = product;

  const [displayAmount, setDisplayAmount] = useState(1);
  const totalPrice = useMemo(() => price * displayAmount, [displayAmount]);

  const handleToggleChecked = useCallback(() => {
    // updateProduct({ ...product, /*TODO: checked: !checked*/ });
  }, [product]);

  const handleRemovingProduct = useCallback(() => {
    if (!confirm("장바구니에서 선택한 상품을 삭제하시겠습니까?")) return;

    // deleteProduct(product);
  }, [product]);

  const handleIncrement = useCallback(async () => {
    // updateProduct({ ...product, amount: amount + AMOUNT_UNIT });
    try {
      console.log(displayAmount + AMOUNT_UNIT, "개 요청하기");
      await axios.patch(`${API_URL.CART}/${id}/${displayAmount + AMOUNT_UNIT}`);
      setDisplayAmount(displayAmount + AMOUNT_UNIT);
    } catch (error) {
      //
      console.error(error);
    }
  }, [displayAmount, product]);

  const handleDecrement = useCallback(() => {
    if (amount - 1 === 0) return;

    // updateProduct({ ...product, amount: amount - AMOUNT_UNIT });
  }, [product]);

  return {
    amount: displayAmount,
    product,
    totalPrice,
    handleToggleChecked,
    handleRemovingProduct,
    handleIncrement,
    handleDecrement,
  };
};

export default useCartItem;
