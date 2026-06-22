import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL PRODUCTS");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Watch For Men",
      description: "Luxury premium watch for men",
      price: 3200,
      image: [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      ],
      category: "Men",
      subCategory: "WATCHES",
      sizes: ["S", "M", "L"],
      bestseller: true,
      limitedEdition: false,
      date: Date.now(),
    },

    {
      _id: "2",
      name: "Luxury Chronograph",
      description: "Premium limited edition chronograph",
      price: 5600,
      image: [
        "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
      ],
      category: "Men",
      subCategory: "WATCHES",
      sizes: ["M", "L"],
      bestseller: true,
      limitedEdition: true,
      date: Date.now(),
    },

    {
      _id: "3",
      name: "Leather Wallet",
      description: "Premium genuine leather wallet",
      price: 850,
      image: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93",
      ],
      category: "Men",
      subCategory: "LEATHER GOODS",
      sizes: ["FREE"],
      bestseller: false,
      limitedEdition: false,
      date: Date.now(),
    },

    {
      _id: "4",
      name: "Leather Belt",
      description: "Classic luxury leather belt",
      price: 650,
      image: [
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a",
      ],
      category: "Men",
      subCategory: "LEATHER GOODS",
      sizes: ["32", "34", "36"],
      bestseller: false,
      limitedEdition: false,
      date: Date.now(),
    },

    {
      _id: "5",
      name: "Luxury Sunglasses",
      description: "Stylish UV protected sunglasses",
      price: 1200,
      image: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      ],
      category: "Accessories",
      subCategory: "ACCESSORIES",
      sizes: ["FREE"],
      bestseller: false,
      limitedEdition: false,
      date: Date.now(),
    },

    {
      _id: "6",
      name: "Luxury Bracelet",
      description: "Premium designer bracelet",
      price: 2100,
      image: [
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
      ],
      category: "Accessories",
      subCategory: "ACCESSORIES",
      sizes: ["FREE"],
      bestseller: true,
      limitedEdition: true,
      date: Date.now(),
    },

    // ✅ NEW PRODUCT ADDED UNDER ALL PRODUCTS
    {
      _id: "7",
      name: "Premium Sneakers",
      description: "Luxury streetwear sneakers collection",
      price: 4500,
      image: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      ],
      category: "Men",
      subCategory: "FOOTWEAR",
      sizes: ["40", "41", "42", "43"],
      bestseller: true,
      limitedEdition: false,
      date: Date.now(),
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Men",
    subCategory: "WATCHES",
    sizes: "",
    bestseller: false,
    limitedEdition: false,
  });

  const addProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price
    ) {
      alert("Please fill all required fields");
      return;
    }

    const product = {
      _id: editingId || Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),
      image: [
        newProduct.image ||
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      ],
      category: newProduct.category,
      subCategory: newProduct.subCategory,
      sizes: newProduct.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      date: Date.now(),
      bestseller: newProduct.bestseller,
      limitedEdition: newProduct.limitedEdition,
    };

    if (editingId) {
      setProducts(
        products.map((p) =>
          p._id === editingId ? product : p
        )
      );

      alert("✅ Product Updated");
    } else {
      setProducts([product, ...products]);

      alert("✅ Product Added");
    }

    setEditingId(null);
    setShowAddModal(false);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "Men",
      subCategory: "WATCHES",
      sizes: "",
      bestseller: false,
      limitedEdition: false,
    });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(
        products.filter((p) => p._id !== id)
      );
    }
  };

  const editProduct = (p) => {
    setEditingId(p._id);

    setNewProduct({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image[0],
      category: p.category,
      subCategory: p.subCategory,
      sizes: p.sizes.join(", "),
      bestseller: p.bestseller,
      limitedEdition: p.limitedEdition,
    });

    setShowAddModal(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL PRODUCTS"
        ? true
        : p.subCategory === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#f5f4f3] min-h-screen pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Catalogue
            </p>

            <h1 className="text-5xl md:text-6xl font-light mt-2">
              Inventory
            </h1>
          </div>

          <button
            onClick={() => {
              setEditingId(null);

              setNewProduct({
                name: "",
                description: "",
                price: "",
                image: "",
                category: "Men",
                subCategory: "WATCHES",
                sizes: "",
                bestseller: false,
                limitedEdition: false,
              });

              setShowAddModal(true);
            }}
            className="bg-black text-white px-8 py-4 rounded-xl"
          >
            + ADD NEW
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-3xl border p-8">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Total Products
            </p>

            <h2 className="text-5xl font-light mt-4">
              {products.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border p-8">
            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Inventory Value
            </p>

            <h2 className="text-5xl font-light mt-4">
              $
              {products
                .reduce(
                  (sum, item) => sum + item.price,
                  0
                )
                .toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4 mb-6">
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex gap-3 overflow-auto mb-8">
          {[
            "ALL PRODUCTS",
            "WATCHES",
            "LEATHER GOODS",
            "ACCESSORIES",
            "FOOTWEAR",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-6 py-3 rounded-xl border whitespace-nowrap ${
                category === item
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* LUXURY HERO SECTION */}

<div className="relative w-full h-[320px] md:h-[620px] overflow-hidden rounded-[32px] border border-[#d6d3d1] mb-10 bg-black group">

  {/* IMAGE */}
  <img
    src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1974&auto=format&fit=crop"
    alt="Luxury Watch"
    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

  {/* TOP BADGE */}
  <div className="absolute top-5 left-5 md:top-8 md:left-8">
    <span className="border border-white/60 bg-black/20 backdrop-blur-md text-white px-5 py-2 text-[10px] md:text-xs tracking-[5px] uppercase rounded-full">
      Limited Edition
    </span>
  </div>

  {/* CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">

    <div className="flex items-end justify-between gap-6">

      {/* LEFT SIDE */}
      <div>

        <p className="uppercase tracking-[6px] text-white/60 text-[10px] md:text-xs mb-3">
          Swiss Luxury Collection
        </p>

        <h2 className="text-white text-3xl md:text-7xl font-light leading-none tracking-tight">
          VANTAGE
          <br />
          TOURBILLON
        </h2>

        <p className="text-white/70 mt-4 tracking-[4px] uppercase text-xs md:text-sm">
          SKU: VT-8829-X
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="text-right">

        <p className="text-white/60 uppercase tracking-[4px] text-[10px] md:text-xs mb-2">
          Starting At
        </p>

        <h3 className="text-white text-3xl md:text-6xl font-light">
          $24,500
        </h3>

      </div>

    </div>

  </div>

</div>

        <div className="bg-white rounded-3xl border overflow-hidden">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center p-6 border-b"
            >
              <div className="flex gap-5 items-center">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.subCategory}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>

                  <p className="text-3xl mt-2 font-light">
                    ${item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-4 md:mt-0">
                {item.bestseller && (
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    BESTSELLER
                  </span>
                )}

                {item.limitedEdition && (
                  <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                    LIMITED
                  </span>
                )}

                <button
                  onClick={() =>
                    editProduct(item)
                  }
                  className="text-gray-500 hover:text-black"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    deleteProduct(item._id)
                  }
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 relative">
            <button
              onClick={() =>
                setShowAddModal(false)
              }
              className="absolute right-6 top-4 text-3xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-8">
              {editingId
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <div className="space-y-4">
              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Sub Category"
                value={newProduct.subCategory}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    subCategory: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-4 rounded-xl"
                placeholder="Sizes (S,M,L)"
                value={newProduct.sizes}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    sizes: e.target.value,
                  })
                }
              />

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={newProduct.bestseller}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      bestseller:
                        e.target.checked,
                    })
                  }
                />
                Bestseller
              </label>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={newProduct.limitedEdition}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      limitedEdition:
                        e.target.checked,
                    })
                  }
                />
                Limited Edition
              </label>

              <button
                onClick={addProduct}
                className="w-full bg-black text-white py-4 rounded-xl"
              >
                {editingId
                  ? "SAVE CHANGES"
                  : "ADD PRODUCT"}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}