import { rest } from "msw";
import db from "./db";

const {
  products,
  orders,
  // carts
} = db;

const PAGE_KEY = "page";
const DEFAULT_PAGE_UNIT = 16;

export const handlers = [
  rest.get("/api/products", (request, response, context) => {
    const page = parseInt(request.url.searchParams.get(PAGE_KEY), 10) || 1;

    const unit = parseInt(request.url.searchParams.get("unit"), 10) || DEFAULT_PAGE_UNIT;
    const endOfPage = Math.ceil(products.length / unit);

    const start = (page - 1) * unit;
    const end = start + unit;
    const responseForProducts = products.slice(start, end);

    return response(context.status(200), context.json({ products: responseForProducts, page, endOfPage }));
  }),
  rest.get("/api/orders", (_, res, context) => {
    return res(context.status(200), context.json({ orders }));
  }),
];
