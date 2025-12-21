import { FaArrowsSpin } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import "./Orderdetail.css";
const Orderdetail = ({ yourOrders }) => {

  const groupedOrders = Object.values(
  yourOrders.reduce((acc, order) => {
    if (!acc[order.order_id]) {
      acc[order.order_id] = {
        order_id: order.order_id,
        total_amount: order.total_amount,
        order_status: order.order_status,
        shipment_id: order.shipment_id,
        payment_id: order.payment_id,
        address: order.address,
        product_names: [],
      };
    }
    acc[order.order_id].product_names.push(order.name);
    return acc;
  }, {})
);



  return (
    <>
      <section className="orderinfo-table-wrapper">
        <table className="orderinfo-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Product Name</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Total</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {groupedOrders.map((ord) => (
              <tr key={ord.order_id}>
                <td>{ord.order_id}</td>
                <td>{ord.product_names.join(", ")}</td>{" "}
                {/* Join array into a string */}
                <td>
                  <span className="pros-ord">
                    <FaArrowsSpin />
                    {ord.order_status}
                  </span>
                </td>   
                <td>
                  <span className="pros-ord">
                    <TiTick /> {ord.payment_id ? "Paid" : "Not Paid"}
                  </span>
                </td>
                <td>{ord.total_amount}</td>
                <td>{ord.address}</td>
        
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
    </>
  );
};

export default Orderdetail;
