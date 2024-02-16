import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import PageHome from "containers/PageHome/PageHome";
import SiteHeader from "containers/SiteHeader";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import ForgetLogin from "containers/ForgetPassword/ForgetPassword";
import SetOtp from "containers/ForgetPassword/otp";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AddProperty from "containers/PageAddListing1/AddProperty";
import EditProperty from "containers/PageAddListing1/EditProperty";


export const pages: Page[] = [
  { path: "/account", component: AccountPage },
  { path: "/account-password", component: AccountPass },
  { path: "/property", component: PageHome },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/verify", component: ForgetLogin },
  { path: "/verifyotp", component: SetOtp },
  { path: "/add-property", component: AddProperty },
  { path: "/edit-property/:id", component: EditProperty },
];

const MyRoutes = () => {
  let WIN_WIDTH = useWindowSize().width;
  if (typeof window !== "undefined") {
    WIN_WIDTH = WIN_WIDTH || window.innerWidth;
  }
 const isToken = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {!isToken && <Route path="/" element={<Navigate to="/login" />} />}
        {!isToken && (
          <Route path="/property" element={<Navigate to="/login" />} />
        )}
        {isToken && <Route path="/" element={<Navigate to="/property" />} />}
        {isToken && (
          <Route
            path="/login"
            element={
              <>
                <SiteHeader />
                <PageLogin />
              </>
            }
          />
        )}
        {pages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route
              key={path}
              element={
                <>
                  <SiteHeader />
                  <Component />
                </>
              }
              path={path}
            />
          );
        })}
        {!isToken && (
          <Route
            path="/property"
            element={
              <>
                <Navigate to="/login" replace />
              </>
            }
          />
        )}
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
    </BrowserRouter>
  );
};

export default MyRoutes;
