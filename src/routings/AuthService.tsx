import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000/api"

type Props = {
  children: React.ReactNode;
}

type Context = {
  user: Number | null;
  onLogin: (uid: Number) => void;
  onLogout: () => void;
}

const initialContext: Context = {
  user: null,
  onLogin: (uid: Number) => { },
  onLogout: () => { }
}


const AuthContext = createContext<Context>(initialContext);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validationUser = () => {
    const value = sessionStorage.getItem('user')
    if (value !== null) {
      setUser(JSON.parse(value))
    } else {
      setUser(null)
    }
  }

  const onLogout = () => {
    sessionStorage.removeItem('user')
    setUser(null)
  }

  const onLogin = async (uid: Number) => {
    /* try {
       const params = { user_id: uid}
       const headers = { Accept: "application/json"}
       const res = await axios.post(`${API}/api/login`, {params, headers})
     } */
    sessionStorage.setItem("user", String(uid))
    validationUser()
    navigate("/")
  }

  useEffect(() => {
    validationUser()
    setLoading(false);
  }, [])

  if (!loading) {
    return <AuthContext.Provider value={{ user, onLogin, onLogout }}>{children}</AuthContext.Provider>;
  }

  return null;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
