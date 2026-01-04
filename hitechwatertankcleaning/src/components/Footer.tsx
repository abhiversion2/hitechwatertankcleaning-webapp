import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold">Hi-Tech Water Tank Cleaning Services</h3>
            <p className="mt-4 text-gray-400">
              Professional and reliable water tank cleaning for homes, societies, and industries.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Legal & Accessibility</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="hover:text-blue-400">Privacy policy</Link></li>
              <li><Link href="/services" className="hover:text-blue-400">Sitemap</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="mt-4 text-gray-400">
              Phone: +91-9323999502<br />
              Email: hitechwatertankcleaning@gmail.com<br />
              Address: A-202, Gandharva CHS, Central Park, Nallasopara(East), Mumbai - 401209, Maharashtra, India
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              {/* Add social icons/links as needed */}
              <span className="text-gray-400 hover:text-white">Facebook</span>
              <span className="text-gray-400 hover:text-white">Instagram</span>
              <span className="text-gray-400 hover:text-white">WhatsApp</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Hi-Tech Water Tank Cleaning Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}