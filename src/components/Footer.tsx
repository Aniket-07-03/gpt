import { Globe, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/state_logo_1.png" alt="logo"/>
              </div>
              <div>
                <h3 className="text-xl font-bold">Smart Financial Reporting</h3>
                <p className="text-sm text-gray-400">Government of Maharashtra</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering Panchayati Raj Institutions through digital governance, transparency, 
              and data-driven decision making across Maharashtra.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2025 Government of Maharashtra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Reports</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Planning</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Accounting</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm">Mantralaya, Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-sm">+91-22-2202-2020</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm">support@egramswaraj.mh.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm">
            Developed by Maharashtra Government in collaboration with Ministry of Panchayati Raj, Government of India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;