const NotFound = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl mt-4">Page Not Found</p>
          <p className="text-lg mt-2">The page you are looking for doesn't exist.</p>
          <a
            href="/home"
            className="mt-6 inline-block px-6 py-2 text-black bg-white rounded-md hover:bg-gray-200"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  