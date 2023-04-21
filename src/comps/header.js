const Header = ({changeTheme, buttonName}) => {
  return (
    <header
    className="flex justify-between items-center p-4"
    style={{ backgroundColor: '#2A303C' }}
  >
    <h1 className="text-3xl text-white">We&apos;reWolf</h1>
    <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded" onClick={changeTheme}>
      {buttonName}
    </button>
  </header>
  );
};

export default Header;