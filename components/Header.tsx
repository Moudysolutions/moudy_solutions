"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navItems, siteConfig } from "@/lib/config";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="nav-container">
                <Link href="/" className="nav-logo">
                    <Image
                        src="/images/logo.png"
                        alt="Moudy Solutions"
                        width={48}
                        height={38}
                        className="logo-img"
                    />
                    <span className="logo-text">Moudy</span>
                    <span className="logo-accent">Solutions</span>
                </Link>

                <button
                    className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    <span className="hamburger"></span>
                </button>

                <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`nav-link ${pathname === item.href ? "active" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className={`fas ${item.icon}`}></i> {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
