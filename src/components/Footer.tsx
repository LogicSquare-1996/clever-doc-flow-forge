
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                DocuGen AI
              </h3>
            </div>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
              Professional document generation powered by artificial intelligence. 
              Create legally compliant documents in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300 dark:text-purple-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Document Types</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">How it Works</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300 dark:text-purple-400">Legal</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-purple-300 dark:hover:text-purple-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300 dark:text-purple-400">Contact Us</h4>
            <div className="space-y-3 text-gray-300 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400 dark:text-purple-500" />
                <span>support@docugen.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-400 dark:text-purple-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-purple-400 dark:text-purple-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-300 dark:text-gray-400">
          <p>&copy; 2024 DocuGen AI. All rights reserved. Made with ❤️ for professionals everywhere.</p>
        </div>
      </div>
    </footer>
  );
};
