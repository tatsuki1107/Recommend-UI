import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useAuth, API } from './routings/AuthService';
import axios from 'axios';
import { Recommend } from './type';


const App: React.FC = () => {
  const [recList, setRecList] = useState<Recommend[]>([])
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate()

  const { user, onLogout } = useAuth();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && query.length !== 0) {
      navigate('/search', { state: { query: query }, replace: true })
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/recommend_books?user_id=${user}`)
        setRecList(res?.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [user])

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

      <main className='main'>
        <h2>あなたにオススメの商品</h2>
        <div className='recommend-contents'>
          {recList?.map((book, i) => (
            <div className='item-info' key={i}>
              <div className='item'>
                <img className='book-img' src={book.image} alt={book.book_title} />
              </div>
              <p>タイトル: {book.book_title}</p>
              <p>著者名: {book.book_author}</p>
              <p>出版社: {book.publisher}</p>
              <p>{book.year_of_publication}年に出版</p>
            </div>
          ))}
        </div>
      </main>

    </div>
  )
}

export default App;
