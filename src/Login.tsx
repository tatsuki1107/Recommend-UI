import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './App.css';
import { useAuth } from "./routings/AuthService";

const Login: React.FC = () => {
  const [state, setState] = useState<Number | null>(null);
  const { user, onLogin } = useAuth()

  if (user) return <Navigate to="/" />

  return (
    <>
      <div className="App">
        <header className='header'>
          <div className='header-contents'>
            <h1>Book Market Demo</h1>
            <p>
              ログアウト中
            </p>
          </div>
        </header>

        <main className="main">
          <div className="login-box">
            <h1>ログイン画面</h1>
            <input onChange={(e) => setState(Number(e.target.value))} />
            <button onClick={() => onLogin(Number(state))}>送信</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
