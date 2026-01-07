import React, { useState, useCallback, useMemo } from "react";
import "./Filter.css";
import { debounce } from "../../../utils/debounce";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import Slider from "@mui/material/Slider";

const Filter = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  // const [selectedColors, setSelectedColors] = useState([]);
  // const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brandsData = [
    { name: "Adidas", count: 2 },
    { name: "Balmain", count: 7 },
    { name: "Balenciaga", count: 10 },
    { name: "Burberry", count: 39 },
    { name: "Kenzo", count: 95 },
    { name: "Givenchy", count: 1092 },
    { name: "Zara", count: 48 },
  ];

  // const filterColors = [
  //   "#0B2472",
  //   "#D6BB4F",
  //   "#282828",
  //   "#B0D6E8",
  //   "#9C7539",
  //   "#D29B47",
  //   "#E5AE95",
  //   "#D76B67",
  //   "#BABABA",
  //   "#BFDCC4",
  // ];

  // const filterSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // debounce memoized
  const debouncedOnFilter = useMemo(
    () =>
      debounce((filters) => {
        onFilter(filters);
      }, 400),
    [onFilter]
  );

  // dùng callback inline để gọi debounced function
  const emitFilter = useCallback(
    (filters) => {
      debouncedOnFilter(filters);
    },
    [debouncedOnFilter]
  );

  // helper build params từ giá trị mới
  const buildParams = ({ brands, colors, sizes, price }) => {
    const params = {};
    if (brands.length) params.brand = brands.join(",");
    if (price) params.price_lte = price[1];
    // if (colors.length) params.color = colors.join(",");
    // if (sizes.length) params.size = sizes.join(",");
    return params;
  };

  const handleBrandChange = (brand) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newBrands);
    emitFilter(
      buildParams({
        brands: newBrands,
        // colors: selectedColors,
        // sizes: selectedSizes,
        price: priceRange,
      })
    );
  };

  // const handleColorChange = (color) => {
  //   const newColors = selectedColors.includes(color)
  //     ? selectedColors.filter((c) => c !== color)
  //     : [...selectedColors, color];

  //   setSelectedColors(newColors);
  //   emitFilter(
  //     buildParams({
  //       brands: selectedBrands,
  //       colors: newColors,
  //       sizes: selectedSizes,
  //       price: priceRange,
  //     })
  //   );
  // };

  // const handleSizeChange = (size) => {
  //   const newSizes = selectedSizes.includes(size)
  //     ? selectedSizes.filter((s) => s !== size)
  //     : [...selectedSizes, size];

  //   setSelectedSizes(newSizes);
  //   emitFilter(
  //     buildParams({
  //       brands: selectedBrands,
  //       colors: selectedColors,
  //       sizes: newSizes,
  //       price: priceRange,
  //     })
  //   );
  // };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceCommitted = (event, value) => {
    setPriceRange(value);
    emitFilter(
      buildParams({
        brands: selectedBrands,
        // colors: selectedColors,
        // sizes: selectedSizes,
        price: value,
      })
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBrands = brandsData.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filterSection">
      {/* Brands */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<IoIosArrowDown size={20} />}>
          <h5 className="filterHeading">Brands</h5>
        </AccordionSummary>
        <AccordionDetails>
          <div className="searchBar">
            <BiSearch className="searchIcon" size={20} color="#767676" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="brandList">
            {filteredBrands.map((brand, index) => (
              <div className="brandItem" key={index}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <label>{brand.name}</label>
                <span>{brand.count}</span>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Colors */}
      {/* <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<IoIosArrowDown size={20} />}>
          <h5 className="filterHeading">Colors</h5>
        </AccordionSummary>
        <AccordionDetails>
          <div className="filterColorBtn">
            {filterColors.map((color, index) => (
              <button
                key={index}
                className={`colorButton ${
                  selectedColors.includes(color) ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* Sizes
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<IoIosArrowDown size={20} />}>
          <h5 className="filterHeading">Sizes</h5>
        </AccordionSummary>
        <AccordionDetails>
          <div className="sizeButtons">
            {filterSizes.map((size) => (
              <button
                key={size}
                className={`sizeButton ${
                  selectedSizes.includes(size) ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion> */}

      {/* Price */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<IoIosArrowDown size={20} />}>
          <h5 className="filterHeading">Price</h5>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceCommitted}
            valueLabelDisplay="auto"
            min={0}
            max={20000000}
            step={100000}
            valueLabelFormat={(v) => `$${v.toLocaleString()}`}
          />
          <div className="filterSliderPrice">
            <p>Min: ${priceRange[0].toLocaleString()}</p>
            <p>Max: ${priceRange[1].toLocaleString()}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Filter;
