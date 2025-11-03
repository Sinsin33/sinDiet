import NavBar from "./NavBar";
import UserDropdown from "./UserDropdown";

function SideBar() {
  return (
    <div>
      {/*  drop down user name */}
      <UserDropdown />
      {/* items */}
      <NavBar />
    </div>
  );
}

export default SideBar;
