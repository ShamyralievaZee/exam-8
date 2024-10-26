import './App.css'
import {NavLink } from 'react-router-dom';

const App = () => {
  return (
    <div className="Outer-header">
      <div className='container'>
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
  );
}


export default App
