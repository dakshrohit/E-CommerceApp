import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/Menubar";
import { Link, useLocation } from "react-router-dom";
import ThemeProvider from "./Theme-provider";
import ModeToggle from "./ModeToggle";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleseller=()=>{
    navigate("/seller-auth")

  }

  const navLinkClass = (path) =>
  ` font-medium transition px-3 py-2 rounded-md bg-transparent ${
    location.pathname === path
      ? "bg-[#DADADA] text-[#0D0D0D] text-lg dark:text-lg dark:bg-[#1A1A1A] dark:text-[#E4E4E4]"
      : "text-[#3A3A3A] dark:text-lg text-lg dark:bg-transparent dark:text-[#B0B0B0] hover:bg-[#DADADA] dark:hover:bg-[#1A1A1A] transition-colors duration-[500ms] ease-in-out"

  }`;




  return (
<ThemeProvider>
  <div className="w-full border-b border-[#CCCCCC] dark:border-[#1A1A1A] bg-[#E4E4E4]  dark:bg-[#0D0D0D]">
    <div className="max-w-7xl  mx-auto px-4 py-4 flex justify-between  items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#0D0D0D] dark:text-[#E4E4E4]">
        ShopEase
      </Link>

      {/* Navigation */}
      <Menubar className="bg-transparent h-10 border-none shadow-none space-x-4">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/" className={navLinkClass("/")}> <b>Home</b></Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/products" className={navLinkClass("/products")}><b>Products</b></Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/cart" className={navLinkClass("/cart")}> <b>Cart</b></Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link to="/profile" className={navLinkClass("/profile")}> <b>Profile</b></Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link  onClick={handleseller}> <b>Seller?</b></Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      {/* Theme Toggle */}
      <div className="ml-4">
        <ModeToggle />
      </div>
    </div>
  </div>
</ThemeProvider>


  );
}
