/*import { context } from '../sockets';
import React, { useContext} from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';

function ChatConnectionBar() {

    const { temptxt,settemptxt,ChatConnection } = useContext(context);
    

    return (
        <form className='connection-form'>
            <div className='connection-text'>
                <label>Enter ID</label>
                <TextField label="ID To Connect" value={temptxt} onChange={(e) => settemptxt(e.target.value)} fullWidth />
            </div>
            <Button variant="contained" color="primary" fullWidth onClick={ChatConnection(temptxt)} >
                  Connect
            </Button>
            
        </form>
    )
}

export default ChatConnectionBar*/

import { context } from '../sockets';
import React, { useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';


function ChatConnectionBar() {

    const { sms,setsms,SendMsg } = useContext(context);
    

    return (
        /*
        <form className='msg-form' onSubmit={SendMsg}>
            <div className='msg-text'>
                <label>Message</label>
                <input 
                type='text' 
                placeholder = 'Type The Message' 
                value={sms}
                onChange={
                    function(e){
                        setsms(e.target.value); // whatever value is typed in 
                    }
                }
                />
            </div>

            <input
                
                type='submit'
                value='Send'

            />
            
        </form>
        */
        <form className='msg-form'>
            <div className='msg-text'>
                <label>Enter message</label>
                <TextField label="Message" value={sms} onChange={function(e){
                    setsms(e.target.value)
                }} fullWidth />
            </div>
            <Button variant="contained" color="primary" fullWidth onClick={SendMsg} >
                    Send
            </Button>
        </form>
    )
}

export default ChatConnectionBar;

