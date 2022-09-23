import { context } from '../sockets';
import React, { useContext } from 'react';
import { Button, TextField, Typography  } from '@material-ui/core';


function MsgBar() {

    const { idToSend,setidToSend,sms,setsms,SendMsg } = useContext(context);
    

    return (

            <form className='msg-form' style={FormStyle}>
                <div className='id-toConnect' style={style1}>
                    <Typography gutterBottom variant="h6">Enter the ID</Typography>
                    <TextField label="ID to connect"  value={idToSend} onChange={function(e){
                        setidToSend(e.target.value)
                    }} fullWidth />
                </div>
                
                <div className='msg-text' syle={style1}>
                    <Typography gutterBottom variant="h6">Enter message</Typography>
                    <TextField label="Message"  value={sms} onChange={function(e){
                        setsms(e.target.value)
                    }} fullWidth />
                </div>

                <Button variant="contained" color="primary" fullWidth onClick={SendMsg} style={style2}>
                        Send
                </Button>
            </form>
          
    )
}


const FormStyle={

    padding: '10px 20px',
    border: '2px solid black',
    width: '20vw',
    display: 'inline-block',
    margin: '10px',
}
const style1={
    marginTop: 15,
    marginBottom: 25,
}
const style2={
    marginTop:25,
}

export default MsgBar
