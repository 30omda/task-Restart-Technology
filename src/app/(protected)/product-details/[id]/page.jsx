import axiosCroud from "@/services/axiosCroud";
import Image from "next/image";
async function getProductDetails(id) {
    try {
        const res = await axiosCroud.get(`/product/${id}`);
        return res.data;
    } catch (err) {
        return null;
    }
}

export default async function ProductDetailsPage({ params }) {
    const product = await getProductDetails(params.id);

    if (!product) return <div className="p-6 text-red-500">Product not found</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <Image
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Category:</strong> {product.category}
            </p>
            <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-gray-500 text-sm">Created at: {product.createdAt}</p>
        </div>
    );
}
