import React from 'react';
import './Home.css'; // You can create a separate CSS file for styling


function Home() {
  return (
    <div className="home-container">
      <div className="jumbotron jumbotron-fluid text-center">
        <div className="container textitem" >
          <h1 className="display-4">Welcome to Talent Verify</h1>
          <p className="lead">Zimbabwe's very own Talent Verifier</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
