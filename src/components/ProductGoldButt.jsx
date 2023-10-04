import { Link } from "react-router-dom";
function ProductGoldButt() {
  return (
    <div id="add_to_cart">
      <Link to={'/cart'} style={{width:"100%"}}><button className="gold_button" style={{width:"100%"}} onClick={() => window.GlobalShoppingCart.push(window.GlobalProductId)}>Добавить в корзину</button></Link>
    </div>
  );
}
export default ProductGoldButt;