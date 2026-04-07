'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { HeartPulse, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const translate = useMemo(
    () => ({
      description: t('footer.description'),
      quickLinks: t('footer.quickLinks'),
      home: t('header.home'),
      locations: t('header.locations'),
      campaigns: t('header.campaigns'),
      donate: t('header.donate'),
      information: t('footer.information'),
      aboutUs: t('footer.aboutUs'),
      contact: t('footer.contact'),
      privacyPolicy: t('footer.privacyPolicy'),
      termsConditions: t('footer.termsConditions'),
      email: t('footer.email'),
      phone: t('footer.phone'),
      followUs: t('footer.followUs'),
      copyright: t('footer.copyright'),
      madeWith: t('footer.madeWith'),
    }),
    [t, i18n.language]
  );

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Hope<span className="text-red-600">Flow</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              {translate.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">{translate.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.locations}
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.campaigns}
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.donate}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">{translate.information}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-red-600 transition-colors text-sm"
                >
                  {translate.termsConditions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">{translate.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                {translate.email}:{' '}
                <a
                  href="mailto:info@hopeflow.com"
                  className="hover:text-red-600 transition-colors"
                >
                  info@hopeflow.com
                </a>
              </li>
              <li className="text-gray-400">
                {translate.phone}:{' '}
                <a
                  href="tel:+1234567890"
                  className="hover:text-red-600 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-gray-400">{translate.followUs}</li>
              <li className="flex space-x-4 pt-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} HopeFlow. {translate.copyright}
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            {translate.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
};
