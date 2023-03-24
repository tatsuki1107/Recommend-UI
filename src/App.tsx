import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useAuth, API } from './routings/AuthService';
import axios from 'axios';
import { Recommend, BookInfo } from './type';

const initialContext: BookInfo = {
  history_book: [],
  rated_book_author: [],
  rated_publisher: []
}

const App: React.FC = () => {
  const [recList, setRecList] = useState<Recommend[]>([])
  const [histList, setHistList] = useState<BookInfo>(initialContext)
  const [query, setQuery] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState<boolean>(false)
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
        {!searchFlag &&
          <>
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
          </>
        }
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

        <h2>評価した著者の回数と平均評価値</h2>
        <div className='rated-book-info'>
          {histList.rated_book_author?.map((rated, i) => (
            <div key={i}>
              <p>著者: {rated.book_author}</p>
              <p>評価した回数: {rated.count}</p>
              <p>評価値の平均値: {rated.mean}</p>
            </div>
          ))}
        </div>

        <h2>評価した出版社の回数と平均評価値</h2>
        <div className='rated-book-info'>
          {histList.rated_publisher?.map((rated, i) => (
            <div key={i}>
              <p>出版社: {rated.publisher}</p>
              <p>評価した回数: {rated.count}</p>
              <p>評価値の平均値: {rated.mean}</p>
            </div>
          ))}

        </div>
        <h2>評価した商品</h2>
        <div className='history-contents'>
          {histList.history_book?.map((book, i) => (
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
