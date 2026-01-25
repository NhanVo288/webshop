import React, { useEffect, useState } from "react";
import "./ShopDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import StoreData from "../../../Data/StoreData";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { fetchProducts } from "../../../Features/Product/productSlice";
import Pagination from "../../Pagination/Pagination";

const ShopDetails = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const { list, loading, pagination } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);

  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, size: 6 })); // Lấy trang đầu, 9 sp mỗi trang
  }, [dispatch,currentPage]);

  const handleFilter = (params) => {
    dispatch(fetchProducts(params));
  };
  const onChangePage = (newPage) => {
    setCurrentPage(newPage-1);
  };
  // Xử lý Sorting (Backend nhận tham số sort)
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    //"price,asc" hoặc "name,desc" tùy theo Backend hỗ trợ
    dispatch(fetchProducts({ sort: [sortValue] }));
  };

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    dispatch(fetchProducts({ page: pageNumber, size: 9 }));
    scrollToTop();
  };

  const handleWishlistClick = (productID) => {
    setWishList((prev) => ({ ...prev, [productID]: !prev[productID] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find((item) => item.id === product.id);

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached");
    } else {
      dispatch(addToCart(product));
      toast.success(`Đã thêm vào giỏ hàng`);
    }
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter onFilter={handleFilter} />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>

              <div className="shopDetailsSort">
                <select name="sort" id="sort" onChange={handleSortChange}>
                  <option value="name,asc">Default Sorting</option>
                  <option value="price,asc">Price, Low to high</option>
                  <option value="price,desc">Price, high to low</option>
                  <option value="createdAt,desc">Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-spinner">Loading products...</div>
            ) : (
              <div className="shopDetailsProducts">
                <div className="shopDetailsProductsContainer">
                  {StoreData.map((product) => (
                    <div className="sdProductContainer" key={product.id}>
                      <div className="sdProductImages">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={scrollToTop}
                        >
                          <img
                            src={product.thumbnail || "placeholder.jpg"}
                            alt={product.name}
                            className="sdProduct_front"
                          />

                          <img
                            src={product.thumbnail || "placeholder.jpg"}
                            alt={product.name}
                            className="sdProduct_back"
                          />
                        </Link>
                        <h4 onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="sdProductImagesCart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus />
                      </div>
                      <div className="sdProductInfo">
                        <div className="sdProductCategoryWishlist">
                          <p>{product.brand || "Brand"}</p>
                          <FiHeart
                            onClick={() => handleWishlistClick(product.id)}
                            style={{
                              color: wishList[product.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <div className="sdProductNameInfo">
                          <Link
                            to={`/product/${product.id}`}
                            onClick={scrollToTop}
                          >
                            <h5>{product.name}</h5>
                          </Link>
                          <p>${product.price}</p>
                          {/* Stock display */}
                          <small>Stock: {product.stock}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Pagination
              currentPage={currentPage + 1}
              totalPages={5}
              onPageChange={onChangePage}
            />
            {/* <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p 
                  className={pagination.pageNumber === 0 ? "disabled" : ""}
                  onClick={() => pagination.pageNumber > 0 && handlePageChange(pagination.pageNumber - 1)}
                >
                  <FaAngleLeft /> Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <p 
                      key={index} 
                      className={pagination.pageNumber === index ? "active" : ""}
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </p>
                  ))}
                </div>
              </div>
              <div className="sdPaginationNext">
                <p 
                  className={pagination.pageNumber + 1 >= pagination.totalPages ? "disabled" : ""}
                  onClick={() => pagination.pageNumber + 1 < pagination.totalPages && handlePageChange(pagination.pageNumber + 1)}
                >
                  Next <FaAngleRight />
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Drawer cho Mobile */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter onFilter={handleFilter} />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
