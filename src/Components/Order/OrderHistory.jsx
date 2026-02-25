import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../Features/Order/orderSlice";
import { cancelOrder } from "../../Features/Order/orderSlice";
import "./OrderHistory.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (isLoading) {
    return <div className="order-loading">Đang tải đơn hàng...</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="order-empty">
        <h3>Bạn chưa có đơn hàng nào</h3>
      </div>
    );
  }
  const handleCancelOrder = async (orderId) => {
  try {
    await dispatch(cancelOrder(orderId)).unwrap();
    dispatch(getMyOrders()); 
  } catch (error) {
    console.error("Huỷ đơn thất bại:", error);
  }
};
  return (
    <div className="order-container">
      <h2 className="order-title">Lịch sử đơn hàng</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          
          {/* Header */}
          <div className="order-header">
            <span className="order-id">Đơn hàng #{order.id}</span>
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          {/* Products */}
          <div className="order-products">
            {order.items?.map((item) => (
              <div key={item.id} className="order-product">
                <img
                  src={item.product?.image}
                  alt=""
                  className="product-image"
                />

                <div className="product-info">
                  <p className="product-name">
                    {item.productName}
                  </p>
                  <p className="product-quantity">
                    x{item.quantity}
                  </p>
                </div>

                <div className="product-price">
                  {new Intl.NumberFormat("vi-VN").format(item.subtotal)} đ
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="order-footer">
            <div className="order-total">
              Thành tiền: 
              <span>
                {new Intl.NumberFormat("vi-VN").format(order.totalAmount)} đ
              </span>
            </div>

            <div className="order-actions">
              {order.status === "PENDING" && (
                <button className="btn-cancel" onClick={() => handleCancelOrder(order.id)}>
                  Hủy đơn
                </button>
              )}

            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
