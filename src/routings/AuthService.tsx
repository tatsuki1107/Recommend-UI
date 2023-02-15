import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Children, Context } from "../type";

export const API = "http://localhost:8000/api"

const initialContext: Context = {
  user: null,
  onLogin: (uid: Number) => { },
  onLogout: () => { }
}

const AuthContext = createContext<Context>(initialContext);

const AuthProvider: React.FC<Children> = ({ children }) => {
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
    try {
      const headers = { Accept: "application/json" }
      const res = await axios.post(`${API}/login?user_id=${uid}`, null, { headers })

      if (res?.data.status === 200) {
        sessionStorage.setItem("user", String(uid))
        validationUser()
        navigate("/")
      } else {
        alert('このユーザーは存在しません。')
      }
    } catch (e) {
      console.error(e)
    }
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
