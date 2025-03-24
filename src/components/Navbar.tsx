'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Profile from './profile';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-foreground font-semibold text-xl flex items-center"
        >
          <span className="bg-blue-600 text-white rounded-md p-1 mr-2">N</span>
          chatWithImage
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {/* <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink> */}
          <div> <Profile /> </div>
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 glass-effect bg-gray-100 p-4 rounded-b-2xl animate-fade-in">
          <div className="flex flex-col space-y-4 p-2">
            {/* <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </MobileNavLink> */}
            <div> <Profile /> </div>
          </div>
        </div>
      )}
    </header>
  );
};

// const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
//   return (
//     <Link
//       href={href}
//       className="text-foreground/80 hover:text-foreground font-medium relative overflow-hidden group transition-colors duration-300"
//     >
//       {children}
//       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
//     </Link>
//   );
// };

// const MobileNavLink = ({
//   href,
//   onClick,
//   children
// }: {
//   href: string;
//   onClick: () => void;
//   children: React.ReactNode
// }) => {
//   return (
//     <Link
//       href={href}
//       className="text-foreground py-2 px-4 rounded-lg hover:bg-secondary transition-colors block"
//       onClick={onClick}
//     >
//       {children}
//     </Link>
//   );
// };

export default NavBar;
