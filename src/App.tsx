import React, { useState, useEffect } from 'react';
import './App.css';
import { useAuth } from './routings/AuthService';
import axios from 'axios';

const API = "http://localhost:8000/api"

const App: React.FC = () => {
  const [recList, setRecList] = useState()
  const [histList, setHistList] = useState()
  const { user, onLogout } = useAuth();

  const recommend_list = [1, 2, 3, 4, 5]
  const history_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  useEffect(() => {
    (async () => {
      const req = { "user_id": user }
      try {
        await axios.post(`${API}/recommend_books`, req).then((res) => setRecList(res?.data)).catch((e) => console.error(e.response.data))
      } catch (e) { }
      try {
        await axios.post(`${API}/rating_history`, req).then((res) => setHistList(res?.data)).catch((e) => console.error(e.response.data))
      } catch (e) { }
    })()
  }, [])

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
          {recommend_list.map((i) => {
            return <div className='item' key={i}>{i}</div>
          })}
        </div>

        <h2>評価した商品</h2>
        <div className='history-contents'>
          {history_list.map((i) => {
            return <div className='item' key={i}>{i}</div>
          })}
        </div>
      </main>

    </div>
  )
}

export default App;
