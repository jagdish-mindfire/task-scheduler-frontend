import CONSTANTS_STRING from '../../constants/strings';

export default function Footer() {
  return (
    <footer className="py-4 px-4 md:px-6 bg-black border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <p className="text-sm text-gray-400 text-center md:text-left">
          {CONSTANTS_STRING.COPYRIGHT_TEXT}
        </p>
        <nav className="space-x-4">
          <a href="#" className="text-sm text-gray-400 hover:text-white">
            {CONSTANTS_STRING.PRIVACY_POLICY_TEXT}
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white">
            {CONSTANTS_STRING.TERMS_OF_SERVICE_TEXT}
          </a>
        </nav>
      </div>
    </footer>
  );
}
