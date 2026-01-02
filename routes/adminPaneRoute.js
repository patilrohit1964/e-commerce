export const ADMIN_DASHBOARD = "/admin/dashboard";
// media routs
export const ADMIN_MEDIA_SHOW = "/admin/media";
export const ADMIN_MEDIA_EDIT = (id) => (id ? `/admin/media/edit/${id}` : "");

// category routes
export const ADMIN_CATEGORY_ADD = "/admin/category/add";
export const ADMIN_CATEGORY_SHOW = "/admin/category";
export const ADMIN_CATEGORY_EDIT = (id) =>
  id ? `/admin/category/edit/${id}` : "";

// product routes
export const ADMIN_PRODUCT_ADD = "/admin/product/add";
export const ADMIN_PRODUCT_SHOW = "/admin/product";
export const ADMIN_PRODUCT_EDIT = (id) =>
  id ? `/admin/product/edit/${id}` : "";

// product variant routes
export const ADMIN_PRODUCT_VARIANT_ADD = "/admin/product-variant/add";
export const ADMIN_PRODUCT_VARIANT__SHOW = "/admin/product-variant";
export const ADMIN_PRODUCT_VARIANT__EDIT = (id) =>
  id ? `/admin/product-variant/edit/${id}` : "";

// coupon routes
export const ADMIN_COUPON_ADD = "/admin/coupon/add";
export const ADMIN_COUPON__SHOW = "/admin/coupon";
export const ADMIN_COUPON__EDIT = (id) =>
  id ? `/admin/coupon/edit/${id}` : "";

// trash route
export const ADMIN_TRASH = "/admin/trash";

// customer route
export const CUSTOMER_SHOW = "/admin/customers";

// review route
export const ADMIN_REVIEW_SHOW = "/admin/review";

// orders route
export const ADMIN_ORDERS_SHOW = "/admin/orders";
export const ADMIN_ORDER__DETAILS = (order_id) =>
  order_id ? `/admin/orders/details/${order_id}` : "";
