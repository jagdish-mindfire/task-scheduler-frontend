import CONSTANTS_STRING from "../../constants/strings";

const Footer = () => (
  <footer className="py-4 px-4 md:px-6 bg-black border-t border-gray-700">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      <p className="text-sm text-gray-400 text-center md:text-left">© 2024 Schedule Me. All rights reserved.</p>
      <nav className="space-x-4">
        <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
