import React, { Fragment, useCallback } from "react";
import { useCart } from "../../hooks";
import { CartItem } from "../../components/CartItem";
import { useMutation } from "react-query";
import { ICartItemUI } from "../../components";
import { requestDeleteItems, requestToggleItem } from "../../apis";

const template = (children: React.ReactNode) => <div>{children}</div>;

function Cart() {
  const {
    status,
    error,
    refetch,
    cart,
    values: { estimatedPrice, allChecked, checkedItems },
    // handlers: { toggleAllCheck, deleteCheckedItems },
  } = useCart();

  const mutations = {
    delete: useMutation({
      mutationFn: (item: ICartItemUI) => requestDeleteItems([item]),
      onSuccess() {
        refetch();
      },
      // TODO: 실패 대응
    }),
    toggleCheck: useMutation({
      mutationFn: ({ items, checked }: { items: ICartItemUI[]; checked: boolean }) => requestToggleItem(items, checked),
      onSuccess() {
        refetch();
      },
      // TODO: 실패 대응
    }),
  };

  const deleteItem = useCallback(
    (item: ICartItemUI) => {
      if (!confirm("장바구니에서 선택한 상품을 삭제하시겠습니까?")) return;

      // useMutation hook을 직접 호출하는 대신, mutate 메서드를 사용
      mutations.delete.mutate(item);
    },
    [mutations]
  );

  const toggleCheckItem = useCallback(
    (item: ICartItemUI) => {
      mutations.toggleCheck.mutate({ items: [item], checked: !item.checked });
    },
    [mutations]
  );

  const toggleAllCheck = useCallback(() => {
    mutations.toggleCheck.mutate({ items: cart.items, checked: !allChecked });
  }, [mutations, cart]);

  // const { handlers: cartItemHandlers } = useCartItemHandlers();
  const cartItemHandlers = {
    toggleCheck(item: ICartItemUI) {
      //
      toggleCheckItem(item);
    },
    handleDeleteItem(item: ICartItemUI) {
      //
      deleteItem(item);
    },
    handleIncrement(item: ICartItemUI) {
      //
    },
    handleDecrement(item: ICartItemUI) {
      //
    },
  };

  if (status === "loading") {
    return template("불러오고 있어요"); // not working.. TODO: 템플릿 작업
  }

  if (status === "error") {
    return template("오류가 발생했어요"); // not working.. TODO: 템플릿 작업
  }

  return (
    <section className="cart-section">
      <header className="flex-col-center mt-20">
        <h2 className="cart-section__title">장바구니</h2>
        <hr className="divide-line mt-20" />
      </header>

      <div className="flex">
        <section className="cart-left-section">
          <div className="flex justify-between items-center">
            <div className="checkbox-container">
              <input
                className="checkbox"
                name="checkbox"
                type="checkbox"
                readOnly
                defaultChecked={allChecked}
                onChange={toggleAllCheck}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                선택해제
              </label>
            </div>
            <button className="delete-button" /*onClick={deleteCheckedItems}*/>상품삭제</button>
          </div>
          {cart?.items?.length > 0 && (
            <>
              <h3 className="cart-title">든든배송 상품({cart.items.length}개)</h3>
              <hr className="divide-line-gray mt-10" />
              {cart?.items?.map((item) => (
                <Fragment key={item.id}>
                  <CartItem item={item} handlers={cartItemHandlers} />
                  <hr className="divide-line-thin mt-10" />
                </Fragment>
              ))}
            </>
          )}
        </section>
        <section className="cart-right-section">
          <div className="cart-right-section__top">
            <h3 className="cart-title">결제예상금액</h3>
          </div>
          <hr className="divide-line-thin" />
          <div className="cart-right-section__bottom">
            <div className="flex justify-between p-20 mt-20">
              <span className="highlight-text">결제예상금액</span>
              <span className="highlight-text">{estimatedPrice.toLocaleString()}원</span>
            </div>
            <div className="flex-center mt-30 mx-10">
              <button className="primary-button flex-center">주문하기({checkedItems.length}개)</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Cart;
