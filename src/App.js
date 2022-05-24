import React, { Component, useEffect } from 'react';
import './App.css';
import openSocket from 'socket.io-client';
const socket = openSocket('https://staging.citrone.co/', { transports: ['websocket'] });


function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(timestamp));
  socket.emit('subscribeToTimer', 1000);
}

const App = () => {
  const [timestamp, setTimeStamp] = React.useState('no timestamp yet')
  const [chats, setChats] = React.useState([])

  useEffect(() => {
    subscribeToTimer((timestamp) => {
      setTimeStamp(timestamp)

    });
  }, [])

  useEffect(() =>{

    let data ={courseId:"623d69a227dd00f9604d179a"}

    socket.emit('fetchComment', data)

    socket.on('fetchComment', data =>{
      console.log(data.post)
      setChats(data.post)
    })

  },[])

  return (
    <div className="App">
      <div className="App-header">
        <h2>Citrone</h2>
        
        <input placeholder='Type in here' />
        {chats.length > 0 && chats.map(item =>{
       return(
         <div style={{ margin:'50px' }}>
           <p>{item.user && item.user.firstName}</p>
           <p>{item.comment}</p>
         </div>
       )
     })}
      </div>
     Test Citrone: {timestamp}
     
    </div>
  );
}

export default App;