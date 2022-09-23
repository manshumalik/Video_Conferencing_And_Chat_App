// this file contains the socket logic
import React, { createContext, useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
const context=createContext();
const socket = io('https://ms-teams-vd.herokuapp.com/');
//const socket = io('http://localhost:5000/')

const MegaParent=function({children}){
   
    // creating state feilds
    const[stream,setStream]=useState(null);
    const[me,setMe]=useState('');
    const[call,setCall]=useState({});
    const[SecondaryName,setSecondaryName]=useState('');
    const[accepted,setaccepted]=useState(false);
    const[ended,setend]=useState(false);
    const[name,setname]=useState('');
    const[msglist,setmsglist]=useState([{SenderName:'YOU ARE----',msg:'----CONNECTED'}]);
    const[idToSend,setidToSend]=useState('');
    const[sms,setsms]=useState('');
    const myvid=useRef();
    const uservid=useRef();
    const peerref=useRef();


    // this function is only called when the connection is first established and it latches on as listeners to several events to listen for
    // chat msg or video call request and to get the client's socket id
    useEffect(function(){
        // user permission stuff
        navigator.mediaDevices.getUserMedia({video: true ,audio: true}).then(function(InputStream){
            setStream(InputStream);
            myvid.current.srcObject=InputStream;
        });

        //event for getting id from socket-io 
        socket.on('me',function(id){
            setMe(id);
        });
        
        // calling event which listens whether someone is calling or not 
        socket.on('Calling', function({ from, name: caller_name, signal }){
            
            setCall({ Receivecall: true, from, name: caller_name, signal });
            setSecondaryName(caller_name);

        });

        // chat event which listens for private msgs.        
        socket.on('Chat',function({SenderName,msg}){
           
            setmsglist( arr => [...arr,{SenderName:SenderName,msg:msg}]);       
        });
        
    },
    []);


    const Answer=function(){
        
        setaccepted(true);

        
        const peer=new Peer({initiator:false,trickle:false,stream});
        
        peer.on('signal',function(data){
            socket.emit('CallAnswer',{signal:data,to:call.from,AccepterName:name});
        });

        peer.on('stream',function(inputstream){
            // the stream of the other user not myvid / mystream
            uservid.current.srcObject=inputstream;
        }
        );
        //info from useeffect function from the statement socket.on('Call')
        peer.signal(call.signal);

        // this is the refrence of the peer which was declared earlier 
        peerref.current=peer;
    }


    // much similar to the answer function 
    const Call=function(id){

        // here the initiator is true because we are initiating the peer connection
        const peer=new Peer({initiator:true,trickle:false,stream});        
        
        peer.on('signal',function(data){
            // emitting my data to the calling event of server
            socket.emit('Calling',{ToCall:id,signalstuff:data,from:me,name});
        })

        peer.on('stream',function(InputStream)
        {
            // the stream of the other user not myvid / mystream
            uservid.current.srcObject=InputStream;
        }
        );

        socket.on('Accepted',function({signal,AccepterName}){
            
            setaccepted(true);
            // Setting the name of the 2nd client on the screen
            setSecondaryName(AccepterName);
            peer.signal(signal);
        })
        peerref.current=peer;
    }


    const SendMsg=function(){

        if(sms!=='')
        {
            // updating the msg list to display in chatbox
            setmsglist( arr => [...arr,{SenderName:"You",msg:sms}]);      
            
            // emitting the msg to server that the client wants to send to another client
            socket.emit("Chat",{idToSend:idToSend,SenderName:name,msg:sms});
            setsms('');

        }
        
    }

    const End=function(){

        setend(true);
        // stop receiving input from users cam and audio device 
        peerref.current.destroy();

    }


    return (
        <context.Provider value={{
          call,accepted,myvid,uservid,stream,name,setname,ended,me,Call,End,Answer,SendMsg,setsms,sms,idToSend,setidToSend,msglist,SecondaryName
        }}>
          {children}
        </context.Provider>
      );
    
};
export{MegaParent,context};