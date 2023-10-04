import ProductCarousel from "../components/productCarousel";
import ProductAdditionals from "../components/ProductAdditionals";
import ProductGoldButt from "../components/ProductGoldButt";
import { useNavigate } from "react-router";
function ProductPage() {
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page(){
    navigate('/');
    backButton.hide();
  }
  backButton.show();
  backButton.onClick(back_page);
  return (
    <div>
      <ProductCarousel />
      <ProductAdditionals />
      <ProductGoldButt />
    </div>
  );
}
export default ProductPage;
