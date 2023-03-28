import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./routings/AuthService";
import axios from "axios";
import { API } from "./routings/AuthService";
import { Recommend } from "./type";
import './App.css';

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState<string>(location.state.query);
  const [book, setBook] = useState<Recommend[]>([])
  const navigate = useNavigate();
  const { user, onLogout } = useAuth();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && query.length !== 0) {
      navigate('/search', { state: { query: query } })
    }
  }
  console.log(`query: ${query}`);
  console.log(`location.state.query: ${location.state.query}`)

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/vector_search?query=${query}`)
        setBook(res?.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [query])

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-contents'>
          <h1>Book Market Demo</h1>
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
      <main className="main">
        <h2>検索ヒット</h2>
        <div className='history-contents'>
          {book?.map((item, i) => (
            <div className='item-info' key={i}>
              <div className='item'>
                <img className='book-img' src={item.image} alt={item.book_title} />
              </div>
              <p>タイトル: {item.book_title}</p>
              <p>著者名: {item.book_author}</p>
              <p>出版社: {item.publisher}</p>
              <p>{item.year_of_publication}年に出版</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Search;
