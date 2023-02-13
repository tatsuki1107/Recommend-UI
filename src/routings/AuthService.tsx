import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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

  const onLogin = (uid: Number) => {
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
