import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  clearDetail, fetchProductDetail } from "../Features/Product/productSlice";

import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";
import { fetchSimilar, trackInteraction } from "../Features/Recommendation/recommendSlice";

const ProductDetails = () => {
  const { id } = useParams();      
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
     return () => {
    dispatch(clearDetail()); 
  };
  }, [dispatch, id]);
  useEffect(() => {
  dispatch(fetchSimilar({ productId: id }));
  dispatch(trackInteraction({
    productId: id,
    categoryId: 1,
    interactionType: "VIEW"
  }));
}, []);
  return (
    <>
      <Product />
      <AdditionalInfo />
      {/* <RelatedProducts /> */}
    </>
  );
};

export default ProductDetails;
