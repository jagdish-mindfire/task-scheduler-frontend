import CONSTANTS_STRING from "../../constants/strings";

const Footer = () => (
  <footer className="py-4 px-6 bg-black border-t border-gray-700">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-400">© 2024 Schecule Me. All rights reserved.</p>
      <nav className="space-x-4">
        <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
      </nav>
    </div>
  </footer>
)

export default Footer;