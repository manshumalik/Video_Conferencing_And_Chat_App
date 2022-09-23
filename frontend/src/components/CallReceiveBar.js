import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { context } from '../sockets';

function CallReceiveBar(){
  const { Answer, call, accepted } = useContext(context);

  return (
    <>
      {call.Receivecall && !accepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={Answer}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default CallReceiveBar;