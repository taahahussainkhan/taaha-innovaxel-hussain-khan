import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Shortly
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-600">Shorten</Link>
          <Link to="/update" className="text-gray-800 hover:text-blue-600">Update</Link>
          <Link to="/retrieve" className="text-gray-800 hover:text-blue-600">Retrieve</Link>
          <Link to="/delete" className="text-gray-800 hover:text-blue-600">Delete</Link>
          <Link to="/stats" className="text-gray-800 hover:text-blue-600">Stats</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
