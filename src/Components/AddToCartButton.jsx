import { useDispatch } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        quantity: 1,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Thêm vào giỏ
    </button>
  );
};

export default AddToCartButton;
