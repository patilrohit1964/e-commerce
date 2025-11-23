"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { WEBSITE_SHOP } from "../../../routes/websiteRoute";
const ShopSearch = ({ isShow }) => {
    const router = useRouter()
    const [query, setQuery] = useState()
    const handleSearch = () => {
        router.push(`${WEBSITE_SHOP}?q=${query}`)
    }
    return (
        <div
            className={`absolute border-t transition-all left-0 py-5 md:px-32 px-5 z-10 bg-white w-full ${isShow ? "top-18" : "-top-full "
                }`}
        >
            <div className="flex justify-between items-center relative">
                <Input
                    className="rounded-full md:h-12 ps-5 border-primary"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch} className="absolute right-3 cursor-pointer">
                    <Search size={20} className="text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default ShopSearch;
