import React from "react";
import NavigationItem from "./NavigationItem";
import { ACTION_DROPDOWN } from "data/navigation";

function Navigation({ }) {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {ACTION_DROPDOWN.map((item) => (
        <NavigationItem
          key={item.id}
          menuItem={item}
          propertyID
        />
      ))}
    </ul>
  );
}

export default Navigation;
