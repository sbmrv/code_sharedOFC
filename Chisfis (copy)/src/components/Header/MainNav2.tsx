import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link } from "react-router-dom";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const hasToken = !!localStorage.getItem("token");

  return (
    <div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden lg:block h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden lg:block">
            <DropdownTravelers />
          </div>
        </div>

        <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden items-center lg:flex space-x-1">
            {hasToken ? (
              <AvatarDropdown />
            ) : (
              <ButtonPrimary
                sizeClass="px-2 py-1 sm:px-2 sm:py-1"
                fontSize="text-xs sm:text-sm font-medium"
                href="/login"
              >
                Login
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
