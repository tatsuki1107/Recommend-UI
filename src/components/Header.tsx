import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../routings/AuthService";
import "../App.css"

const Header = () => {
  const [query, setQuery] = useState<string>("")
  const navigate = useNavigate()
  const { user, onLogout } = useAuth()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && query.length !== 0) {
      navigate('/search', { state: { query: query } })
    }
  }
  return (
    <header className='header'>
      <div className='header-contents'>
        <h1>Booking.com demo</h1>
        <input
          className="search"
          placeholder='本を検索する'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}></input>
        <div>
          <p>ユーザーID: {Number(user)}</p>
          <button onClick={() => onLogout()}>ログアウト</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
