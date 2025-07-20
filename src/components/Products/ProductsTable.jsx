"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, DeleteProduct } from "@/store/api/products/productsAction";


import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";



import Link from "next/link";


import {
    IconEdit,
    IconTrashX,
    IconDatabasePlus,
    IconPlus
} from "@tabler/icons-react"
const Page = () => {
    const [searchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);


    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await dispatch(fetchProducts()).unwrap();
                setAllProducts(response || []);
                setTotalProducts(response.length);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(DeleteProduct({ id }));
    };

    const filteredProducts = useMemo(() => {
        const query = searchQuery?.toLowerCase()?.trim();
        if (!query) return allProducts;
        return allProducts.filter((products) =>
            Object.values(products).some((value) =>
                String(value)?.toLowerCase()?.includes(query)
            )
        );
    }, [allProducts, searchQuery]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
            cell: (info) => info.getValue(),
        },
        { header: "Description", accessorKey: "description", cell: (info) => info.getValue() },
        {
            header: "Price",
            accessorKey: "price",
            cell: (info) => info.getValue(),
        },
        { header: "Created-At", accessorKey: "created-at", cell: (info) => info.getValue() },
        {
            header: "ID",
            accessorKey: "id",
            cell: (info) => info.getValue(),
        },
    ];


    let action = (rowData) => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                    <DropdownMenuItem className="w-full">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Link href={`/product-details/${rowData.id}`} className="block w-full  py-1 hover:bg-slate-100">
                                    <div className="flex flex-row justify-between items-center w-full cursor-pointer">
                                        <span className="mr-2 font-bold">Details</span>
                                        <IconDatabasePlus className=" text-2xl text-green-500" />
                                    </div>
                                </Link>
                            </DialogTrigger>
                        </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuLabel className="hover:bg-slate-100 rounded">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex flex-row justify-between items-center w-full cursor-pointer">
                                    <span className="mr-2 font-bold">Edit</span>
                                    <IconEdit
                                        className="text-lg text-yellow-500"
                                    />
                                </div>
                            </DialogTrigger>

                            <DialogContent className="w-[80%] lg:max-w-[90%] max-h-[80%]">
                                <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div>
                                    <EditProduct
                                        name={rowData?.name}
                                        description={rowData?.description}
                                        category={rowData?.category}
                                        price={rowData?.price}
                                        id={rowData?.id}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuLabel>

                    <DropdownMenuLabel className="hover:bg-slate-100 rounded">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex flex-row justify-between items-center w-full cursor-pointer">
                                    <span className="mr-2 font-bold">Delete</span>
                                    <IconTrashX
                                        className="text-lg text-red-500"
                                    />
                                </div>
                            </DialogTrigger>

                            <DialogContent className="w-[30%] lg:max-w-[90%] max-h-[90%]">
                                <DialogHeader>
                                    <DialogTitle className=" text-red-400 ">
                                        Delete Product
                                    </DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete{" "}
                                        <span className="font-bold text-red-400 mr-1">
                                            {rowData?.name}
                                        </span>
                                        .
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose asChild></DialogClose>
                                <Button
                                    className="w-full bg-red-500 text-white hover:bg-red-700"
                                    onClick={() => handleDelete(rowData?.id)}
                                >
                                    Delete
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className="mx-5">
            <Tabs defaultValue="week">
                <TabsContent value="week" className="mx-4 my-4">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="flex flex-row">
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-slate-800">
                                    Products
                                </h2>

                            </div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center mr-4">
                              
                            </div>
                            <div className="flex items-center mr-4">
                                <Dialog>
                                    <DialogTrigger>
                                        <div className="flex flex-row justify-between items-center w-full cursor-pointer border-dotted border-2 p-1 border-slate-400 rounded-lg bg-slate-100 hover:bg-slate-200">
                                            <span className="mr-2 font-semibold text-slate-700">
                                                Add Product
                                            </span>
                                            <IconPlus
                                                className="text-xl text-green-500"
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="w-[90%] lg:max-w-[90%] max-h-[90%]">
                                        <DialogHeader>
                                            <DialogTitle>Add Product</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                            <AddProduct />
                                        </DialogHeader>
                                        <DialogClose asChild></DialogClose>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>
                    </div>
                    <Table
                        columns={columns}
                        data={paginatedProducts}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden sm:table-cell">Name</TableHead>
                                <TableHead className="hidden sm:table-cell">description</TableHead>
                                <TableHead className="hidden sm:table-cell">price</TableHead>
                                <TableHead className="hidden sm:table-cell">Category</TableHead>
                                <TableHead className="hidden md:table-cell">ID</TableHead>
                                <TableHead className="hidden md:table-cell">Created-At</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                [...Array(itemsPerPage)].map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton className="h-7 w-20 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-40 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-30 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-20 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-20 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-20 bg-slate-200" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Skeleton className="h-7 w-20 bg-slate-200" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : paginatedProducts?.length > 0 ? (
                                paginatedProducts.map((product, index) => (
                                    <TableRow key={index} className="bg-accent">
                                        <TableCell>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {product.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.description}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.price}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.id}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.createdAt}
                                        </TableCell>


                                        <TableCell className="text-right">{action(product)}

                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="8" className="text-center">
                                        No products found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-4">
                        <Button
                            variant="outline"
                            className="mr-2"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            className="ml-2"
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                        <div className="ml-4">
                            <Select
                                onValueChange={(value) => {
                                    setItemsPerPage(Number(value));
                                    setCurrentPage(1);
                                }}
                                value={String(itemsPerPage)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Items per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">Show 5</SelectItem>
                                    <SelectItem value="10">Show 10</SelectItem>
                                    <SelectItem value="20">Show 20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
};
export default Page;





