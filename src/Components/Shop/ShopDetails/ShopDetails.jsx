import React, { useEffect, useState } from "react";
import "./ShopDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartInfo } from "../../../Features/Cart/cartSlice";
import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import StoreData from "../../../Data/StoreData";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  fetchProducts,
  searchProducts,
} from "../../../Features/Product/productSlice";
import Pagination from "../../Pagination/Pagination";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const { list, loading, pagination, searchItems, searchPagination } =
    useSelector((state) => state.product);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({});
  const currentPagination = isFiltering ? searchPagination : pagination;
  const [currentPage, setCurrentPage] = useState(0);
  const cartItems = useSelector((state) => state.cart.items);

  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const displayList = isFiltering ? searchItems || [] : list || [];

  const handleFilter = (params) => {
    setCurrentPage(0);
    setIsFiltering(true);
    setCurrentFilter(params);

    dispatch(
      searchProducts({
        ...params,
        page: 0,
        size: 6,
      }),
    );
  };
  const onChangePage = (newPage) => {
    setCurrentPage(newPage - 1);
  };
  const handleSortChange = (e) => {
    const value = e.target.value;

    const [sortBy, sortDir] = value.split(",");

    setCurrentPage(0);

    if (isFiltering) {
      const newFilter = {
        ...currentFilter,
        sortBy,
        sortDir,
      };

      setCurrentFilter(newFilter);

      dispatch(
        searchProducts({
          ...newFilter,
          page: 0,
          size: 6,
        }),
      );
    } else {
      dispatch(
        fetchProducts({
          sortBy,
          sortDir,
          page: 0,
          size: 6,
        }),
      );
    }
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

  const handleAddToCart = ({ productId, quantity }) => {
    dispatch(getCartInfo(productId));
    dispatch(addToCart({ productId, quantity }));
  };
  useEffect(() => {
    if (isFiltering) {
      dispatch(
        searchProducts({
          ...currentFilter,
          page: currentPage,
          size: 6,
        }),
      );
    } else {
      dispatch(fetchProducts({ page: currentPage, size: 6 }));
    }
  }, [dispatch, currentPage, isFiltering, currentFilter]);
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
                  <option value="name,desc">Default Sorting</option>
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
                  {displayList.map((product) => (
                    <div className="sdProductContainer" key={product.id}>
                      <div className="sdProductImages">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={scrollToTop}
                        >
                          <img
                            src={
                              product.images?.[0]?.imageUrl || "placeholder.jpg"
                            }
                            alt={product.name}
                            className="sdProduct_front"
                          />

                          {/* <img
                            src={product.thumbnail || "placeholder.jpg"}
                            alt={product.name}
                            className="sdProduct_back"
                          /> */}
                        </Link>
                        <h4
                          onClick={() =>
                            handleAddToCart({
                              productId: product.id,
                              quantity: 1,
                            })
                          }
                        >
                          Add to Cart
                        </h4>
                      </div>
                      <div
                        className="sdProductImagesCart"
                        onClick={() =>
                          handleAddToCart({
                            productId: product.id,
                            quantity: 1,
                          })
                        }
                      >
                        <FaCartPlus />
                      </div>
                      <div className="sdProductInfo">
                        <div className="sdProductCategoryWishlist">
                          <p>{product.brand || "Brand"}</p>
                          {/* <FiHeart
                            onClick={() => handleWishlistClick(product.id)}
                            style={{
                              color: wishList[product.id] ? "red" : "#767676",
                              cursor: "pointer",
                            }}
                          /> */}
                        </div>
                        <div className="sdProductNameInfo">
                          <Link
                            to={`/product/${product.id}`}
                            onClick={scrollToTop}
                          >
                            <h5>{product.name}</h5>
                          </Link>
                          <p>${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Pagination
              currentPage={currentPage + 1}
              totalPages={currentPagination.totalPages || 0}
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
