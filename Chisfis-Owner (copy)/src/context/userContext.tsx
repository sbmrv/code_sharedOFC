import React, { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import { API_URL } from "../api/config";
interface OwnerData {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  image: string;
}
interface PropertyData {
  _id: any;
  title: string;
  address: string;
  price: string;
}

interface AuthContextProps {
  ownerData: OwnerData;
  onLogout: () => void;
  getAdminData: () => Promise<void>;
}

const initialState: AuthContextProps = {
  ownerData: {
    _id: "",
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
  },
  onLogout: () => {},
  getAdminData: async () => {},
};

const AuthContext = createContext<AuthContextProps>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [ownerData, setOwnerData] = useState<OwnerData>({
    _id: "",
    name: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    image: "",
  } as any);

  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    setOwnerData(initialState.ownerData);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const getAdminData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/owner/getowner`, {
        headers: {
          token: token,
        },
      });
      if (response.data.error === false) {
        const info = response.data.ownerdata;
        setOwnerData({
          _id: info._id,
          name: info.name,
          email: info.email,
          dateOfBirth: info.dateOfBirth,
          phoneNumber: info.phoneNumber,
          image: info.image,
        });
      } else {
        onLogout();
      }
      setLoading(false);
    } catch (err) {
      console.error("error while fetching userInfo", err);
      onLogout();
      setLoading(false);
    }
  };

  const pathnameArray = ["login", "signup", "verify", "verifyotp"];
  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    const currentPathname = window?.location?.pathname.substring(1);
    //true && false
    //true && true
    if (!pathnameArray.includes(currentPathname) && !hasToken) {
      onLogout();
    }
    if (!pathnameArray.includes(currentPathname) && hasToken) {
      getAdminData();
    }
  }, [window?.location]);

  const value: AuthContextProps = {
    ownerData,
    onLogout,
    getAdminData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
