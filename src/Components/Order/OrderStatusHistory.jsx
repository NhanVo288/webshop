import React, { useEffect } from "react";
import * as Icons from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import './OrderStatusHistory.css'
import { useParams } from "react-router-dom";
import {
  getOrderStatus,
  clearOrderStatus,
} from "../../Features/Order/orderSlice";

const OrderStatusHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderStatus } = useSelector((state) => state.order);
  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  useEffect(() => {
    if (!id) return;

    dispatch(getOrderStatus(id));

    return () => {
      dispatch(clearOrderStatus());
    };
  }, [dispatch, id]);
  return (
    <div className="order-status-history">
      <h3>Lịch sử trạng thái</h3>

      {orderStatus.map((history, index) => {
        const isLast = index === orderStatus.length - 1;

        return (
          <div
            key={history.id}
            className={`order-status-item ${isLast ? "active" : "completed"}`}
          >
            <div className="order-status-icon">
              {history.status === "PENDING" && <Icons.TbChecklist />}
              {history.status === "PAID" && <Icons.TbCreditCard />}
              {history.status === "PROCESSING" && <Icons.TbReload />}
              {history.status === "SHIPPED" && <Icons.TbTruckDelivery />}
              {history.status === "DELIVERED" && <Icons.TbShoppingBagCheck />}
              {history.status === "CANCELLED" && <Icons.TbCircleX />}
            </div>

            <div className="order-status-content">
              <h4>{history.status}</h4>
              <p>{history.notes}</p>
              <span>{formatDate(history.createdAt)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusHistory;
