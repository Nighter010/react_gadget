import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:88/apiReact_gadget/Product.php");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">รายการสินค้า</h1>

        {/* Search Input */}
        <div className="mt-4 mb-8">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts
            .filter((product) =>
              product.pro_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.pro_id}
                className="bg-white overflow-hidden shadow rounded-lg mb-4 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.pic_url}
                  alt={product.pro_name}
                  className="w-full h-30 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.pro_name}</h2>
                  <p className="text-gray-700 mb-2">ราคา: {product.price}฿</p>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              className={`mx-2 px-3 py-2 rounded-full focus:outline-none ${
                currentPage === number + 1 ? "bg-sky-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </button>
          ))} 
        </div>

        {/* Product Details Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-bold">{selectedProduct?.pro_name}</h2>
                <button
                  className="close-button text-gray-600 hover:text-gray-800"
                  onClick={closePopup}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>รายละเอียด: {selectedProduct?.pro_detail}</p>
                <p>ประเภท: {selectedProduct?.type}</p><br />
                <p className="font-bold">จำนวน: {selectedProduct?.qty}</p><br />
                <p className="font-bold">ราคา: {selectedProduct?.price} ฿</p>
                <img
                  src={selectedProduct?.pic_url}
                  alt={selectedProduct?.pro_name}
                  className="mt-4 w-130 h-80 ml-4"
                />
                <button className="bg-green-600 px-4 py-2 rounded-full text-white">
                  สั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
