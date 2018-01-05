import React from "react";

const userName ="AlienSL4Y3R1596"
const score = "923423432"
const email = "sean.majure@spaceboy.com"

const Panel = () => (
<div className="panel panel-default">
    <div className="panel-heading">
    <span className="profHeader"> YOU ARE :</span> 
     <br></br>
     {userName}
    </div>
    <div className="panel-body">
      <div className="high-score">
      <span className="profHeader"> YOUR BEST SCORE IS :</span> 
        <br></br>
        {score}
      </div>
      <div className="user-email">
      <span className="profHeader"> SEND CHALLENGES TO :</span>
        <br></br>
        {email}
      </div>  
    </div>
  </div>
);

export default Panel;
