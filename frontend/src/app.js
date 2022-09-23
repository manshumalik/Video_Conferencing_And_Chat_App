import React , {useContext} from 'react';
import { Typography, AppBar } from '@material-ui/core';
import VidStream from './components/VidStream';
import EventBar from './components/EventBar';
import CallReceiveBar from './components/CallReceiveBar';
import MsgBar from './components/MsgBar';
import ChatBox from './components/ChatBox';




  const wrapstyle={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }


const App = () => {

  return (
    <div style={wrapstyle}>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Call & Chat Application</Typography>
      </AppBar>
      <VidStream />
      <EventBar>
        <CallReceiveBar />
      </EventBar>
      <div style={{display:'flex'}}>
        <MsgBar/>
        <ChatBox />
      </div>
    </div>
  );
};

export default App;