import { Search, User2 } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-background  px-4 py-2">
      <div className="container max-w-[1600px] mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" aria-label="Ir al inicio">
          {/* <CuervoLogo /> */}
          <img
            src="/logo-banner-r.svg"
            alt="logo"
            className="aspect-auto object-cover"
          />
        </Link>
        <div className="flex items-center gap-5 list-none">
          {/* <SearchField />
          <MenuBar className="hidden md:flex items-center space-x-5" />
          <DropdownMenuMyAccount sessionProp={session} /> */}
          <Search className=" h-6 w-6 text-gray-400 cursor-pointer" />

          <User2 className="hidden md:block h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
