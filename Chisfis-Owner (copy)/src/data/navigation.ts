import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";


export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "property",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "logout",
  },
];

//  Action dropdown to edit and delete properties
const actionDropdownMenu: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/edit-property",
    name: "Edit Property",
  },
  {
    id: ncNanoId(),
    href: "",
    name: "delete Property",
  },
];
export const ACTION_DROPDOWN: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/property",
    name: "Action",
    type: "dropdown",
    children: actionDropdownMenu,
    isNew: true,
  },
];
