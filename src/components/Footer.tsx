import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Link href="/">
              <img
                src="/logo.png"
                alt="The Light Blue House Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-gray-700">
            <Link href="/about" className="hover:text-cyan-500">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-cyan-500">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-cyan-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-500">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} The Light Blue House. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;