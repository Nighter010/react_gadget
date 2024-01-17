import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const [isAdding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    pro_name: "",
    pro_detail: "",
    qty: 0,
    price: 0,
    pic_url: "",
    type: ""
  });

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:88/apiReact_gadget/crud_product.php");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (product) => {
    setEditedProduct(product);
    setEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = {
        pro_name: editedProduct.pro_name,
        pro_detail: editedProduct.pro_detail,
        qty: editedProduct.qty,
        price: editedProduct.price,
        pic_url: editedProduct.pic_url,
        type: editedProduct.type,
        // เพิ่มข้อมูลที่คุณต้องการแก้ไข
      };
  
      const response = await axios.put(`http://localhost:88/apiReact_gadget/crud_product.php?id=${editedProduct.pro_id}`, updatedProduct);
  
      if (response.status === 200) {
        console.log("Product updated successfully:", response.data);
  
        setEditing(false);
        setEditedProduct(null);
  
        const updatedData = await axios.get("http://localhost:88/apiReact_gadget/crud_product.php");
        setProducts(updatedData.data);
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedProduct(null);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?");
    
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:88/apiReact_gadget/crud_product.php?id=${productId}`);
        
        if (response.status === 200) {
          console.log("Product deleted successfully:", response.data);

          const updatedData = await axios.get("http://localhost:88/apiReact_gadget/crud_product.php");
          setProducts(updatedData.data);
        } else {
          console.error("Error deleting product:", response.data);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  const handleAdd = () => {
    setAdding(true);
  };

  const handleSaveAdd = async () => {
    try {
      const response = await axios.post("http://localhost:88/apiReact_gadget/crud_product.php", newProduct);

      if (response.status === 200) {
        console.log("Product added successfully:", response.data);

        setAdding(false);
        setNewProduct({
          pro_name: "",
          pro_detail: "",
          qty: 0,
          price: 0,
          pic_url: "",
          type: ""
        });

        const updatedData = await axios.get("http://localhost:88/apiReact_gadget/crud_product.php");
        setProducts(updatedData.data);
      } else {
        console.error("Error adding product:", response.data);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancelAdd = () => {
    setAdding(false);
    setNewProduct({
      pro_name: "",
      pro_detail: "",
      qty: 0,
      price: 0,
      pic_url: "",
      type: ""
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">รายการสินค้า</h1>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        เพิ่มสินค้า
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">รหัสสินค้า</th>
            <th className="border px-4 py-2">ชื่อสินค้า</th>
            <th className="border px-4 py-2">รายละเอียด</th>
            <th className="border px-4 py-2">ประเภท</th>
            <th className="border px-4 py-2">จำนวน</th>
            <th className="border px-4 py-2">ราคา</th>
            <th className="border px-4 py-2">รูปภาพ</th>
            <th className="border px-4 py-2">แก้ไข</th>
            <th className="border px-4 py-2">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pro_id}>
              <td className="border px-4 py-2">{product.pro_id}</td>
              <td className="border px-4 py-2">{product.pro_name}</td>
              <td className="border px-4 py-2">{product.pro_detail}</td>
              <td className="border px-4 py-2">{product.type}</td>
              <td className="border px-4 py-2">{product.qty}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <img src={product.pic_url} alt={product.pro_name} className="w-10 h-10" />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  แก้ไข
                </button>
                </td>
                <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(product.pro_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ชื่อสินค้า:</label>
                <input
                  type="text"
                  value={editedProduct?.pro_name || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, pro_name: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">รายละเอียด:</label>
                <textarea
                  value={editedProduct?.pro_detail || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, pro_detail: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">จำนวน:</label>
                <input
                  type="number"
                  value={editedProduct?.qty || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, qty: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ราคา:</label>
                <input
                  type="number"
                  value={editedProduct?.price || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="mr-2 bg-red-500 text-white ml-4 px-4 py-2 rounded hover:bg-red-700"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{isAdding && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAdd();
              }}
            >
              {/* (ฟอร์มกรอกข้อมูลสำหรับเพิ่มสินค้า) */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">ชื่อสินค้า:</label>
                <input
                  type="text"
                  value={newProduct.pro_name}
                  onChange={(e) => setNewProduct({ ...newProduct, pro_name: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
                <label className="block text-gray-700 mb-2">รายละเอียด:</label>
                <input
                  type="text"
                  value={newProduct.pro_detail}
                  onChange={(e) => setNewProduct({ ...newProduct, pro_detail: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-10 border focus:outline-none focus:border-blue-500"
                />
             <label className="block text-gray-700 mb-2">ประเภท:</label>
              <select
                value={newProduct.type}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                className="form-select mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
              >
                <option value="หูฟัง">หูฟัง</option>
                <option value="ลำโพง">ลำโพง</option>
              </select>

                <label className="block text-gray-700 mb-2">จำนวน:</label>
                <input
                  type="number"
                  value={newProduct.qty}
                  onChange={(e) => setNewProduct({ ...newProduct, qty: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
                <label className="block text-gray-700 mb-2">ราคา:</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-2 border focus:outline-none focus:border-blue-500"
                />
                <label className="block text-gray-700 mb-2">ลิงค์รูปภาพ:</label>
                <input
                  type="text"
                  value={newProduct.pic_url}
                  onChange={(e) => setNewProduct({ ...newProduct, pic_url: e.target.value })}
                  className="form-input mt-1 block w-full rounded-md px-4 py-10 border focus:outline-none focus:border-blue-500"
                />

              </div>
              {/* (เพิ่ม input fields สำหรับ pro_detail, qty, price, pic_url, type) */}
              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                  บันทึก
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="mr-2 bg-red-500 text-white ml-4 px-4 py-2 rounded hover:bg-red-700"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
