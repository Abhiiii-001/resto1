import React from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="w-8 h-8 bg-rRed rounded-lg flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Restro</span>
            </div>
            <p className="text-gray-500 font-medium mb-6">
              The modern way to experience dining. Skip the wait and order instantly.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-rGray flex items-center justify-center text-gray-600 hover:text-rRed hover:bg-red-50 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-rGray flex items-center justify-center text-gray-600 hover:text-rRed hover:bg-red-50 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-rGray flex items-center justify-center text-gray-600 hover:text-rRed hover:bg-red-50 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Explore</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><button onClick={() => router.push('/restaurants')} className="hover:text-rRed transition-colors">Restaurants</button></li>
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-rRed transition-colors">How it Works</button></li>
              <li><button onClick={() => scrollTo('why-choose')} className="hover:text-rRed transition-colors">Key Features</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><button onClick={() => scrollTo('why-choose')} className="hover:text-rRed transition-colors">About Us</button></li>
              <li><button onClick={() => {}} className="hover:text-rRed transition-colors">Careers</button></li>
              <li><button onClick={() => {}} className="hover:text-rRed transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>support@restro.com</li>
              <li>+1 (555) 000-0000</li>
              <li>123 Foodie Ave, Gourmet City</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Restro. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
