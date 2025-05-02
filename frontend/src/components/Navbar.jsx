import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-4 fixed w-full top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="ByteLink Logo" className="h-8 w-auto" />
          <span className="text-lg font-medium text-gray-800">ByteLink</span>
        </Link>
        
        <div className="flex space-x-1 md:space-x-2">
          {[
            { path: '/', label: 'Shorten' },
            { path: '/update', label: 'Update' },
            { path: '/retrieve', label: 'Retrieve' },
            { path: '/delete', label: 'Delete' },
            { path: '/stats', label: 'Stats' }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;