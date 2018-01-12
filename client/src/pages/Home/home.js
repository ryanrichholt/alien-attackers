import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Footer } from "../../components/Footer";
import './home.css';

// class Home extends Component {
//   state = {

//   };
  
//   render() {
//     return (
//       <Container fluid>
//       <div className="video-background">
//       <div className="video-foreground">
//         <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameBorder="0" allowFullScreen></iframe>
//       </div>
//       </div>
//         <Row>
//           <Col size="md-12">
          
//             <button onClick ={() => {
                
//               console.log('button was clicked');
              
//             }}><h1>Welcome to The Game App</h1></button>

//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default Home;



const Home = ({ children }) =>
  <div id='home'>

    <div id='container'>
      
      <div id='jumbo' className="row text-center justify-content-center p-4 mx-auto">
                <h1>Welcome to Alien Attackers!</h1>
      </div>
    </div>
      {/* Buttons */}
      <div id='buttons' className="row mx-auto d-flex flex-row justify-content-around">
            <div className="col-lg-3 col-sm-8 d-flex text-center">
              <Link to='game' className="btn btn-warning mx-4 w-100 d-md-block btn-landingPage">Play Game</Link>
            </div>
            <div className="col-lg-3 col-sm-8 d-flex text-center">
              <Link to='leaderboard' className="btn btn-info mx-4 w-100 d-md-block btn-landingPage">View Leaderboard</Link>
            </div>
            <div className="col-lg-3 col-sm-8 d-flex text-center">
            <Link to='profile' className="btn btn-danger mx-4 w-100 d-md-block btn-landingPage">Create Profile</Link>
          </div>
          <div className="col-lg-3 col-sm-8 d-flex text-center">
          <Link to='https://github.com/ryanrichholt/alien-attackers' className="btn btn-primary mx-4 w-100 d-md-block btn-landingPage">Git Hub Repo</Link>
        </div>
        </div>

      {/* Landing Background */}
      <div className="video-background">
      <div className="video-foreground">
      <iframe src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameBorder="0" allowFullScreen></iframe>
      </div>
      </div>

   
      
  </div>

export default Home;