import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth, API } from './routings/AuthService';
import axios from 'axios';
import { Recommend, History } from './type';

const App: React.FC = () => {
  const [recList, setRecList] = useState<Recommend[]>([])
  const [histList, setHistList] = useState<History[]>([])
  const { user, onLogout } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/recommend_books?user_id=${user}`)
        setRecList(res?.data)
      } catch (e) {
        console.error(e)
      }
      try {
        const res = await axios.get(`${API}/rating_history?user_id=${user}`)
        setHistList(res?.data)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [user])

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-contents'>
          <h1>Booking.com demo</h1>
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

        <h2>評価した商品</h2>
        <div className='history-contents'>
          {histList?.map((book, i) => (
            <div className='item-info' key={i}>
              <div className='item'>
                <img className='book-img' src={book.image} alt={book.book_title} />
              </div>
              <p>評価: {book.book_rating}</p>
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
