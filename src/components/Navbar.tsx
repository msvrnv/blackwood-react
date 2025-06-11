import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { text: "Home", route: "/" },
        { text: "Collections", route: "/collections" },
        { text: "Access", route: "/" },
        { text: "Support", route: "/" }
    ];

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (menuOpen) {
                const isInside =
                    mobileMenuRef.current?.contains(e.target as Node) ||
                    hamburgerRef.current?.contains(e.target as Node);
                if (!isInside) setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="p-px rounded-[45px] bg-gradient-to-r from-[#666666] via-[#000000] to-[#666666]">
            <div className="flex max-md:justify-start justify-between items-center rounded-[45px] bg-gradient-to-r from-[#030202] via-[#464646] to-[#030202] px-[25px] py-4 text-white">
                <div
                    className="hidden max-md:block text-[1.5rem] text-white cursor-pointer lg:hidden mr-[15px]"
                    ref={hamburgerRef}
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="left">
                    <h1 className="text-[1.4rem] m-0 font-medium">Blackwood Inc.</h1>
                </div>
                <div className="max-md:hidden">
                    {menuItems.map(item => (
                        <Link key={item.text} to={item.route} onClick={closeMenu} className="mx-[15px] text-white no-underline font-normal transition-colors duration-300 hover:text-[#ccc]">{item.text}</Link>
                    ))}
                </div>
                <div className="max-md:hidden flex items-center gap-2 bg-[#222] px-3 py-1.5 rounded-[20px]">
                    <input
                        className="bg-transparent border-none outline-none text-white text-[0.9rem]"
                        type="text"
                        placeholder="Search..."
                    />
                    <FontAwesomeIcon icon={faSearch} className="text-white" />
                </div>
            </div>

            <div
                ref={mobileMenuRef}
                className={`fixed top-0 left-0 w-[250px] h-full bg-[#111] flex flex-col pt-[80px] transition-all duration-300 z-[1000] ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {menuItems.map(item => (
                    <Link key={item.text} to={item.route} onClick={closeMenu} className="text-white px-5 py-[15px] no-underline border-b border-[#333] hover:bg-[#222]">{item.text}</Link>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
