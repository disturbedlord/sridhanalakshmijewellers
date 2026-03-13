import pool from "../db.js";
import { logger } from "../pinoLogger.js";

export const GetAllProducts = async (req, res) => {
  try {
    const allCategoryQuery = "SELECT name , image from categories";
    let response = {
      categories: null,
      products: null,
    };
    const [allCategoriesResult] = await pool.query(allCategoryQuery, []);
    if (allCategoriesResult?.length > 0) {
      response.categories = allCategoriesResult;
    }

    const getProducts =
      "SELECT sku , name , image , price , category FROM products where is_active = 1 and stock_quantity > 0;";
    const [getProductsResult] = await pool.query(getProducts, []);
    if (getProductsResult?.length > 0) {
      response.products = getProductsResult;
    }

    res.status(200).json({ status: 1, response });
  } catch (err) {
    res.status(500).json({ status: 0, error: err });
  }
};
