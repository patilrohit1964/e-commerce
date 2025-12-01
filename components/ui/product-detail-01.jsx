"use client";

import { Button } from "./button";
import { ChevronLeft, ChevronRight, Minus, Plus, Star } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/cartReducer";
import { decode } from "entities";
import Link from "next/link";
import { WEBSITE_PRODUCT_DETAILS } from "../../routes/websiteRoute";

const productData = {
	name: "Man Black Cotton T-Shirt",
	description:
		"A comfortable and durable cotton t-shirt for men. Gives you a perfect fit and a great look for every occasion.",
	category: "Clothing",
	rating: 4.9,
	originalPrice: 25.4,
	discount: 6,
	currency: "$",
	images: [
		"https://images.unsplash.com/photo-1502389614483-e475fc34407e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
		"https://images.unsplash.com/photo-1618453292459-53424b66bb6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
		"https://images.unsplash.com/photo-1618453292507-4959ece6429e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
		"https://images.unsplash.com/photo-1617984102437-a4aa52284d00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
	],
	sizes: ["S", "M", "L", "XL", "XXL"],
	stockMessage: "Last 1 left - make it yours!",
};

export function ProductDetailOne({ productData, productSizes, productColors, productVariants, productReview }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [selectedSize, setSelectedSize] = useState(productVariants?.size);
	const [selectedColor, setSelectedColor] = useState(productVariants?.color);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch()
	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % productVariants?.medias?.length);
	};
	const prevImage = () => {
		setCurrentImageIndex((prev) =>
			(prev - 1 + productVariants.medias.length) % productVariants?.medias?.length);
	};
	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
	const addToInCart = () => {
		const cartData = {
			_id: productData?._id,
			category: productData?.category?.name,
			discountPercentage: productVariants?.discountPercentage,
			name: productData?.name,
			quantity,
			color: productVariants?.color,
			size: productVariants?.size,
			sellingPrice: productVariants?.sellingPrice,
			mrp: productVariants?.mrp,
			media: productVariants?.medias[currentImageIndex]?.secure_url
		}
		dispatch(addToCart({ ...cartData, quantity }))
	}

	return (
		<div className="w-full max-w-6xl mx-auto not-prose">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* Image Section */}
				<div className="flex gap-2">
					<div className="flex flex-col w-28 gap-2">
						{/* changing image list button */}
						{productVariants?.medias?.map((image, index) => (
							<button
								key={index}
								onClick={() => setCurrentImageIndex(index)}
								className={cn(
									"aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer",
									currentImageIndex === index
										? "border-gray-900"
										: "border-transparent"
								)}>
								<img
									src={image?.secure_url}
									alt={`${productData?.name} ${index + 1}`}
									className="w-full h-full object-cover" />
							</button>
						))}
					</div>

					<div
						className="flex-1 relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
						<img
							src={productVariants?.medias[currentImageIndex]?.secure_url}
							alt={productData?.name}
							className="w-full h-full object-cover" />

						{/* Navigation Arrows */}
						<Button
							variant="outline"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full cursor-pointer"
							onClick={prevImage}>
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full cursor-pointer"
							onClick={nextImage}>
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Product Info Section */}
				<div className="space-y-6">
					<div>
						<a
							href="#"
							className="text-muted-foreground hover:text-gray-900 inline-block mb-2">
							{productData.category?.name}
						</a>
						<h1 className="text-3xl font-bold">{productData?.name}</h1>
						<div className="flex items-center gap-1 py-2">
							{Array.from({ length: 5 }).map((_, idx) => (
								<Star key={idx} size={18} />
							))}
							<span className="text-sm ps-2">({productReview} Reviews)</span>
						</div>
						<p className="text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: decode(productData?.discription) }}></p>
					</div>

					<div className="flex items-end gap-2">
						<p className="text-gray-400 font-medium text-md line-through">
							{productData.mrp.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
							{/* {productData.sellingPrice} */}
						</p>
						<p className="text-3xl font-bold">
							{productData?.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: "INR" })}
							{/* {productData.mrp - productData?.discountPercentage} */}
						</p>
						<p className="text-[#389588] font-medium text-md">
							{productData?.discountPercentage}% off
							{/* {productData.sellingPrice} */}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-2 uppercase">Size: {productVariants?.size}</h3>
						<div className="flex gap-2">
							{productSizes?.map((size) => (
								<Link href={`${WEBSITE_PRODUCT_DETAILS(productData?.slug)}?color=${productVariants?.color}&&size=${size}`} key={size}
								>
									<Button
										key={size}
										variant={productVariants?.size === size ? "default" : "outline"}
										size="sm"
										className={'uppercase cursor-pointer'}
										onClick={() => setSelectedSize(size)}>
										{size}
									</Button>
								</Link>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium mb-2">Color: {productVariants?.color}</h3>
						<div className="flex gap-2">
							{productColors?.map((color) => (
								<Link href={`${WEBSITE_PRODUCT_DETAILS(productData?.slug)}?color=${color}&&size=${productVariants?.size}`} key={color}
								>
									<Button
										variant={productVariants?.color === color ? "default" : "outline"}
										size="sm"
										className={'uppercase cursor-pointer'}
										onClick={() => setSelectedColor(color)}>
										{color}
									</Button>
								</Link>
							))}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center border border-gray-300 rounded-lg">
							<Button
								variant="ghost"
								size="icon"
								className="h-10 w-10 rounded-lg hover:bg-gray-100 cursor-pointer"
								onClick={decrementQuantity}>
								<Minus className="w-4 h-4" />
							</Button>
							<span className="w-12 text-center font-medium">{quantity}</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-10 w-10 rounded-lg hover:bg-gray-100 cursor-pointer"
								onClick={incrementQuantity}>
								<Plus className="w-4 h-4" />
							</Button>
						</div>
						<Button size="lg" className={'cursor-pointer'} onClick={addToInCart}>Add to cart</Button>
					</div>
				</div>
			</div>
		</div >
	);
}
