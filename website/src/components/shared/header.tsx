'use client'

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Languages, Menu, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { LOCALE_STORAGE_KEY } from '@/src/i18n/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from '../ui/dropdown-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '../ui/drawer';

export default function Header() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const translate = useMemo(
    () => ({
      home: t('header.home'),
      badge: t('hero.badge'),
      locations: t('header.locations'),
      campaigns: t('header.campaigns'),
      donate: t('header.donate'),
      register: t('header.register'),
      profile: t('header.profile'),
      logout: t('header.logout'),
    }),
    [t, currentLang]
  );

  const setLanguage = (lng: 'en' | 'kh') => {
    i18n.changeLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    }
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    // Add your logout logic (e.g. clear auth, redirect)
  };

  const navLinks = [
    { href: '/', label: translate.home },
    { href: '/locations', label: translate.locations },
    { href: '/campaigns', label: translate.campaigns },
    { href: '/donate', label: translate.donate },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Hope<span className="text-red-600">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile and md */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side: Hamburger (mobile/md) + Language + Register */}
          <div className="flex items-center gap-2 sm:gap-4" suppressHydrationWarning>
            {/* Hamburger - visible only on mobile and md */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
              <DrawerTrigger asChild>
                <Button
                  type="button"
                  className="lg:hidden p-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-full max-w-[280px] data-[vaul-drawer-direction=right]:max-w-[280px]">
                <DrawerHeader className="text-left border-b border-gray-100 pb-4">
                  <DrawerTitle className="text-lg font-semibold text-gray-900">
                    Menu
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col flex-1 overflow-y-auto px-4 py-2">
                  {/* Profile */}
                  <DrawerClose asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-medium">{translate.profile}</span>
                    </Link>
                  </DrawerClose>
                  {/* Navigation */}
                  <nav className="flex flex-col gap-0.5 mt-2">
                    {navLinks.map(({ href, label }) => (
                      <DrawerClose key={href} asChild>
                        <Link
                          href={href}
                          className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                          onClick={() => setDrawerOpen(false)}
                        >
                          {label}
                        </Link>
                      </DrawerClose>
                    ))}
                    <DrawerClose asChild>
                      <Link
                        href="/register"
                        className="rounded-lg px-3 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        onClick={() => setDrawerOpen(false)}
                      >
                        {translate.register}
                      </Link>
                    </DrawerClose>
                  </nav>
                  {/* Logout */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setDrawerOpen(false);
                      }}
                      className="flex items-center gap-3 w-full rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    >
                      <LogOut className="w-5 h-5 text-gray-500" />
                      {translate.logout}
                    </button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            {/* Language Switch and Register - visible all breakpoints */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="gap-2 min-w-[4rem] sm:min-w-[4.5rem] border-2 border-blue-500 bg-gray-900 text-blue-400 hover:bg-gray-800 hover:border-blue-400 hover:text-blue-300 data-[state=open]:border-blue-400 data-[state=open]:bg-gray-800 data-[state=open]:text-blue-300"
                >
                  <Languages className="w-4 h-4 shrink-0" />
                  <span>{currentLang === 'kh' ? 'KH' : 'EN'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuArrow className="fill-gray-900" />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('kh')}>
                    Khmer
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button type="button" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 sm:px-6 hidden sm:inline-flex">
              {translate.register}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
