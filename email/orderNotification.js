export function orderNotificationEmail({
  name,
  orderId,
  products,
  totalAmount,
  shippingAddress,
  orderDate,
  status,
  orderDetailsUrl,
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Order Confirmation - Order #${orderId}</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            background: #fff;
            margin: 32px auto;
            max-width: 650px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.03);
            border: 1px solid #ebebeb;
          }
          .header {
            background: #212121;
            color: #fff;
            padding: 24px 32px;
            text-align: center;
          }
          .order-info {
            padding: 24px 32px 16px 32px;
            color: #212121;
          }
          .order-info h2 {
            margin-top: 0;
          }
          .detail-row {
            margin: 5px 0 14px 0;
            color: #555;
          }
          .products-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }
          .products-table th, .products-table td {
            border: 1px solid #e0e0e0;
            padding: 10px;
            text-align: left;
          }
          .products-table th {
            background: #f7f7f7;
            color: #212121;
            font-weight: 600;
          }
          .products-table tr:nth-child(even) {
            background: #fafafa;
          }
          .footer {
            background: #f7f7f7;
            color: #666;
            text-align: center;
            padding: 18px 16px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Order!</h1>
          </div>
          <div class="order-info">
            <h2>Hello, ${name || "Customer"}!</h2>
            <div class="detail-row">
              <strong>Order ID:</strong> ${orderId}<br/>
              <strong>Order Date:</strong> ${orderDate || "---"}<br/>
              <strong>Status:</strong> ${status || "pending"}
            </div>
            <div class="detail-row">
              <strong>Shipping Address:</strong><br/>
              ${shippingAddress || "---"}
            </div>
            <h3>Order Details:${orderDetailsUrl}</h3>
            <table class="products-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${
                  products && products.length
                    ? products
                        .map(
                          (product, idx) => `
                        <tr>
                          <td>${idx + 1}</td>
                          <td>${product.name || "-"}</td>
                          <td>${product.quantity || 1}</td>
                          <td>₹${Number(product.sellingPrice).toFixed(2)}</td>
                          <td>₹${(
                            Number(product.sellingPrice) *
                            Number(product.quantity || 1)
                          ).toFixed(2)}</td>
                        </tr>
                      `
                        )
                        .join("")
                    : `<tr><td colspan="5" style="text-align:center;">No products</td></tr>`
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" style="text-align: right; font-weight: bold;">Total:</td>
                  <td style="font-weight: bold;">₹${Number(totalAmount).toFixed(
                    2
                  )}</td>
                </tr>
              </tfoot>
            </table>
            <p>
              If you have any questions about your order, simply reply to this email. We're here to help!
            </p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} YourShop. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
}
