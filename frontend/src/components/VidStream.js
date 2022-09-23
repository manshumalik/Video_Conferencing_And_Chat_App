import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';

import { context } from '../sockets';


function VidStream(){
  const { name, accepted, myvid, uservid, ended, stream,SecondaryName } = useContext(context);


  return (
    <Grid container style={GridStyle}>
      {stream && (
        <Paper style={PaperStyle}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myvid} autoPlay style={VidStyle} />
          </Grid>
        </Paper>
      )}
      {accepted && !ended && (
        <Paper style={PaperStyle}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{SecondaryName || 'Name'}</Typography>
            <video playsInline ref={uservid} autoPlay style={VidStyle} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};


const VidStyle={
  width: '530px',
  
}

const GridStyle={
  justifyContent: 'center',
}

const PaperStyle={
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
}



export default VidStream;