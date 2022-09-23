import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { context } from '../sockets';


function EventBar({ children }){
  const {me,accepted,name,setname,ended,End,Call} = useContext(context);
  const [idToCall, setIdToCall] = useState('');

  return (
    <Container style={contstyle}>
      <Paper elevation={10} style={paperstyle}>
        <form style={rootstyle} noValidate autoComplete="off">
          <Grid container style={gridstyle}>
            <Grid item xs={12} md={6} style={padstyle}>
              <Typography gutterBottom variant="h6">Your Information</Typography>
              <TextField label="Your Name" value={name} onChange={(e) => setname(e.target.value)} fullWidth />
              <CopyToClipboard text={me} style={margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} style={padstyle}>
              <Typography gutterBottom variant="h6">Call A User</Typography>
              <TextField label="ID to connect" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {accepted && !ended ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={End} style={margin}>
                  End Call
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => Call(idToCall)} style={margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};


const rootstyle={
  display: 'flex',
  flexDirection: 'column',
}

const gridstyle={
width: '100%',
}

const contstyle={
width: '600px',
margin: '35px 0',
padding: 0,
}

const margin={
marginTop: 20,
}

const padstyle={
padding: 20,
}

const paperstyle={
padding: '10px 20px',
border: '2px solid black',
}


export default EventBar;
