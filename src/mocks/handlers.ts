import { rest } from "msw";
import db from "./db.json";
import { ICart, IOrder } from "../domain/shopping-cart/types";

const { products, orders: defaultOrders, carts: defaultProductsInCart } = db;

const orders: IOrder[] = [...defaultOrders];
const cart: ICart = { items: [...defaultProductsInCart] };

/////////////////////////////////////

const PAGE_KEY = "page";
const UNIT_KEY = "unit";
const DEFAULT_PAGE = "1";
const DEFAULT_PAGE_UNIT = "16";

/////////////////////////////////////

type TAnalyzePagesArgument = {
  page: string;
  unit: string;
  items: unknown[];
};

function analyzePages({ page = "1", unit = DEFAULT_PAGE_UNIT, items = [] }: TAnalyzePagesArgument) {
  const parsedPage = parseInt(page || DEFAULT_PAGE, 10);
  const parsedUnit = parseInt(unit || DEFAULT_PAGE_UNIT, 10);
  const endOfPage = Math.ceil(items.length / parsedUnit);

  const start = (parsedPage - 1) * parsedUnit;
  const end = start + parsedUnit;

  return { parsedPage, parsedUnit, endOfPage, start, end };
}

export const handlers = [
  rest.get("/api/products", (request, response, context) => {
    const page = request.url.searchParams.get(PAGE_KEY) || DEFAULT_PAGE;
    const unit = request.url.searchParams.get(UNIT_KEY) || DEFAULT_PAGE_UNIT;

    const { start, end, endOfPage, parsedPage } = analyzePages({ page, unit, items: products });

    // console.log(`
    //   page: ${page},
    //   unit: ${unit},
    //   start: ${start},
    //   end: ${end},
    //   endOfPage: ${endOfPage}
    // `);

    const responseForProducts = products.slice(start, end);

    return response(context.status(200), context.json({ products: responseForProducts, page: parsedPage, endOfPage }));
  }),
  rest.get("/api/orders", (_, res, context) => {
    return res(context.status(200), context.json({ orders }));
  }),

  /////////////////////////
  // 장바구니

  rest.get("/api/cart", (request, response, context) => {
    const page = request.url.searchParams.get(PAGE_KEY) || DEFAULT_PAGE;
    const unit = request.url.searchParams.get(UNIT_KEY) || DEFAULT_PAGE_UNIT;

    const { start, end, endOfPage, parsedPage } = analyzePages({ page, unit, items: cart.items });

    const responseForProductsInCart = cart.items.slice(start, end);
    const responseCart: ICart = { items: responseForProductsInCart };
    console.log(responseCart, "resp Cart");

    return response(context.status(200), context.json({ cart: responseCart, page: parsedPage, endOfPage }));
  }),

  rest.get("/api/cart/count", (_, response, context) => {
    return response(context.status(200), context.json({ count: cart.items.length }));
  }),

  rest.patch("/api/cart/:cartItemId/:amount/", (request, response, context) => {
    const { cartItemId, amount } = request.params;
    const [parsedItemId, parsedAmount] = [parseInt(cartItemId as string, 10), parseInt(amount as string, 10)];

    const item = cart.items.find(({ id }) => id === parsedItemId);
    if (item) {
      item.product.amount = parsedAmount;
      return response(context.status(200));
    }
    return response(context.status(400), context.json({ code: 404, message: "NOT FOUND ITEM" }));
  }),
];
