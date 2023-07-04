import Logout from "../Logout";

const Header = () => {
  return (
    <span className="flex justify-between">
      <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Chats</h1>
      <Logout />
    </span>
  );
};
export default Header;
