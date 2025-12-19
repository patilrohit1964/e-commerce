"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardDescription, CardTitle } from "../../../components/ui/card";
import { removeToCart } from "../../../store/reducers/cartReducer";
import { useDispatch } from "react-redux";

const cartItem = {
    id: 1,
    name: "Apple AirPods Pro (2nd gen)",
    category: "Headphones",
    image:
        "https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160",
    price: 129.0,
    originalPrice: 129,
    quantity: 1,
};

// show each product item of cart that present in add to cart
export function CartItems({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch()
    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
    const removeCartItem = () => {
        dispatch(removeToCart({ productId: item?._id, variantId: item?.variantId }))
    };
    return (
        <Card
            className="w-full max-w-[480px] bg-muted border shadow-none rounded-xl not-prose p-4 flex-row gap-4 border-gray-500">
            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                <img
                    src={item.media}
                    alt={item.name}
                    className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        {/* <CardDescription>{item.category}</CardDescription> */}
                        <CardTitle>{item.name}</CardTitle>
                        <p className="uppercase text-xs">{item?.color}/{item?.size}</p>
                    </div>

                    <Button size="icon" variant="ghost" className={'cursor-pointer hover:text-red-500 transition-all duration-200'} onClick={removeCartItem}>
                        <Trash2 className="h-4 w-4 " />
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center bg-background text-foreground rounded-lg border border-gray-200">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-muted"
                            onClick={decrementQuantity}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                            {quantity}
                        </span>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-muted"
                            onClick={incrementQuantity}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <p className="text-xl font-semibold">
                        ${(item.sellingPrice * quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </Card>
    );
}
