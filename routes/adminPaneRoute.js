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


// trash route
export const ADMIN_TRASH = "/admin/trash";
