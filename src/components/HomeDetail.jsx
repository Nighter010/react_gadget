import React from "react";
import Modal from "react-modal";

const HomeDetail = ({ product, closeModal }) => {
  if (!product) {
    return null;
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-xl font-bold">{product.pro_name}</h2>
        <button
          className="close-button text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>
      <div className="modal-body">
        <p>รหัสสินค้า: {product.pro_id}</p>
        <p>รายละเอียด: {product.pro_detail}</p>
        <p>จำนวน: {product.qty}</p>
        <p>ราคา: {product.price}฿</p>
        <p>ประเภท: {product.type}</p>
        <img src={product.pic_url} alt={product.pro_name} className="w-full h-40 object-cover" />
        {/* Add other details as needed */}
      </div>
    </Modal>
  );
};

export default HomeDetail;
