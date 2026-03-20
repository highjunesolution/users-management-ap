import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const menuItem = [
  {
    id: 1,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    name: "Contact",
    to: "/",
  },
  {
    id: 3,
    name: "Service",
    to: "/",
  },
];

const NavMenu = () => {
  return (
    <div className="flex justify-between items-center gap-x-4 h-full py-4">
      <Link to={"/"} className="text-4xl cursor-pointer">
        <FontAwesomeIcon icon={faApple} />
      </Link>
      <div className="flex-1 space-x-4">
        {menuItem.map((item, index) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={
              index === 0
                ? `bg-gray-200 py-2 px-4 font-medium rounded-md`
                : `py-2 px-4 font-medium rounded-md`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="text-slate-500">
        <FontAwesomeIcon icon={faPowerOff} />
      </div>
    </div>
  );
};

export default NavMenu