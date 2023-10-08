import { useNavigate } from "react-router";
function HeaderNotification() {
  const navigate = useNavigate();
  return (
    <div className="header_notification">
      <p>
        У вас есть незавершенный заказ. Нажмите на иконку, чтобы перейти к
        оформлению.
      </p>
      <div
        className="shopping_cart_icon"
        onClick={() => navigate("/cart")}
      ></div>
    </div>
  );
}
export default HeaderNotification;
