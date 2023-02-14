import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth } from './routings/AuthService';
import axios from 'axios';

const API = "http://localhost:8000/api"

interface Recommend {
  book_id: string,
  book_author: string,
  book_title: string,
  image: string,
  publisher: string,
  year_of_publication: number,
}

interface History extends Recommend {
  book_rating: number
}


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
          {recList?.map((book, i) => {
            return <div className='item' key={i}>
              <img className='book-img' src={book.image} />
            </div>
          })}
        </div>

        <h2>評価した商品</h2>
        <div className='history-contents'>
          {histList?.map((book, i) => {
            return <div className='item' key={i}>
              <img className='book-img' src={book.image} />
            </div>
          })}
        </div>
      </main>

    </div>
  )
}

export default App;
