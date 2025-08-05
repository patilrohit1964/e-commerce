import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/adminPaneRoute";
import {
  LayoutDashboard,
  Folder,
  ShoppingCart,
  Tag,
  ClipboardList,
  Users,
  Star,
  Image as ImageIcon,
} from "lucide-react";

export const adminAppSidebarMenu = [
  {
    title: "Dashboard",
    url: ADMIN_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Category",
    url: "#",
    icon: Folder,
    subMenu: [
      {
        title: "Add Category",
        url: "#",
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: ShoppingCart,
    subMenu: [
      {
        title: "Add Product",
        url: "#",
      },
      {
        title: "Add Variant",
        url: "#",
      },
      {
        title: "All Products",
        url: "#",
      },
      {
        title: "Products Variants",
        url: "#",
      },
    ],
  },
  {
    title: "Coupons",
    url: "#",
    icon: Tag,
    subMenu: [
      {
        title: "All Coupon",
        url: "#",
      },
      {
        title: "All Coupons",
        url: "#",
      },
    ],
  },
  {
    title: "Orders",
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "Customers",
    url: "#",
    icon: Users,
  },
  {
    title: "Rating & Review",
    url: "#",
    icon: Star,
  },
  {
    title: "Media",
    url: ADMIN_MEDIA_SHOW,
    icon: ImageIcon,
  },
];
