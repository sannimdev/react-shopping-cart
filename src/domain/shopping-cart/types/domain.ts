// 규격은 README.md에 안내된 Mock Server 데이터의 규격을 참고하였습니다.
export interface IProduct {
  id: number | string;
  name: string;
  price: number;
  imageUrl: string;
  amount?: number;

  createdAt?: number;
  updatedAt?: number;
}

export interface ICart {
  // id: number | string;
  products: ICartProduct[];
}

export interface ICartProduct {
  id: number;
  product: IProduct;
  checked?: boolean;
}

export interface IOrder {
  id: number | string;
  orderDetails: IProduct[];
}
