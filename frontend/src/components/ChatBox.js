
import { context } from "../sockets";
import React, { useContext, useState,useEffect } from "react";
import { List,ListItem,Paper,Typography } from "@material-ui/core";




function ChatBox() {

  const {msglist} = useContext(context); // msglist is the object array , each object has 2 attributes SenderName:  and msg:
  console.log(msglist);
    
  
    return (
      <div style={BoxStyle}>
        <Typography gutterBottom variant="h4" align='center'>Chat Box</Typography>
        <Paper style={{maxHeight: 240,minHeight: 240, overflow: 'auto'}}>
        <List>
          {msglist.map((obj)=>(
            <ListItem key={obj.msg}>{`${obj.SenderName}:${obj.msg}`}</ListItem>

          ))}
        </List>
        </Paper>
      </div>
    );
 
  
}

const BoxStyle={


  padding: '10px 20px',
  border: '2px solid black',
  width: '35vw',
  display: 'inline-block',
  margin: '10px', 
}

export default ChatBox;
