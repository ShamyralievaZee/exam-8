import {Routes, Route, NavLink } from 'react-router-dom';
import AddQuote from './containers/AddQuote/AddQuote.tsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="Outer-header">
        <div className="container">
          <header className='header'>
            <NavLink className="logo" to="/">
              <p>Quotes Central</p>
            </NavLink>
            <div className='nav-links'>
              <NavLink className='nav-link' to="/">Quotes</NavLink>
              <NavLink className='nav-link' to="/add-quote">Submit New Quote</NavLink>
            </div>
          </header>
        </div>
      </div>
      <Routes>
        <Route path="/add-quote" element={<AddQuote/>}/>
      </Routes>
    </div>

  );
}

export default App
