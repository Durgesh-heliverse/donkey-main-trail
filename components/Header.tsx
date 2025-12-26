"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface HeaderProps {
  data: {
    logo?: {
      asset: {
        _ref: string;
      };
    };
    navigation?: Array<{
      name: string;
      href: string;
      hasDropdown?: boolean;
    }>;
    raceDropdownItems?: Array<{
      name: string;
      href: string;
    }>;
  };
}

export default function Header({ data }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRaceDropdownOpen, setIsRaceDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { logo, navigation, raceDropdownItems } = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {logo ? (
              <div className="relative h-10 w-auto">
                <Image
                  src={urlFor(logo).url()}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            ) : (
              <span className="text-lg font-bold transition-colors text-gray-900">
                Donkey Trail
              </span>
            )}
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {navigation?.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown && raceDropdownItems ? (
                  <div
                    className="flex items-center cursor-pointer"
                    onMouseEnter={() => setIsRaceDropdownOpen(true)}
                    onMouseLeave={() => setIsRaceDropdownOpen(false)}
                  >
                    <span
                      className={`transition-colors ${
                        isScrolled
                          ? "text-gray-900 hover:text-accent-orange"
                          : "text-white hover:text-accent-orange"
                      }`}
                    >
                      {item.name}
                    </span>
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-colors ${
                        isScrolled ? "text-gray-900" : "text-white"
                      }`}
                    />
                    {isRaceDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                        {raceDropdownItems.map((raceItem, raceIndex) => (
                          <Link
                            key={raceIndex}
                            href={raceItem.href || "#"}
                            className="block px-4 py-2 text-gray-700 hover:bg-accent-orange hover:text-white transition-colors"
                          >
                            {raceItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`transition-colors ${
                      isScrolled
                        ? "text-gray-900 hover:text-accent-orange"
                        : "text-white hover:text-accent-orange"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden py-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-colors text-grey-900" />
            ) : (
              <Menu
                className={`h-6 w-6 transition-colors ${
                  isScrolled ? "text-grey-900" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`lg:hidden border-t ${
              isScrolled ? "border-gray-200" : "border-white/20"
            }`}
          >
            {navigation?.map((item, index) => (
              <div key={index} className="py-2">
                {item.hasDropdown && raceDropdownItems ? (
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium transition-colors text-gray-900 ">
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-colors ${
                          isScrolled ? "text-gray-900" : "text-grey-900"
                        }`}
                      />
                    </div>
                    <div className="pl-4">
                      {raceDropdownItems.map((raceItem, raceIndex) => (
                        <Link
                          key={raceIndex}
                          href={raceItem.href || "#"}
                          className={`block py-2 transition-colors ${
                            isScrolled
                              ? "text-gray-700 hover:text-accent-orange hover:bg-orange-50"
                              : "text-white/80 hover:text-accent-orange"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {raceItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block px-4 py-3 -mx-2 transition-colors text-grey-900 hover:text-accent-orange hover:bg-orange-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
