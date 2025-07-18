"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addProduct } from "@/store/api/products/productsAction";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
    image: yup
        .string()
        .url("Image must be a valid URL")
        .required("Image URL is required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await dispatch(addProduct(data)).unwrap();
            setLoading(false);
            reset(); 
        } catch (err) {
            console.error("Add product error:", err);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register("category")} />
                {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" {...register("price")} />
                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" {...register("image")} />
                {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </Button>
        </form>
    );
};

export default AddProduct;
