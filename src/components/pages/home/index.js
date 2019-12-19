import React from 'react'
import { Link } from 'react-router-dom'

// Images
import HomeImg from '../../../assets/images/home.png'

function Home() {
  return (
    <div className="page-content home">
      <img className="page-img" src={HomeImg} alt="" />
      <Link to="/matches">
        <button>AFL Bingo</button>
      </Link>
    </div>
  );
}

export default Home;
