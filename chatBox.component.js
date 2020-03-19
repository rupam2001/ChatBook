import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/chatBox.css';
import axios from 'axios';
const ChatBox = (props) => {
    const [chats, setChats] = useState(
        []
    )
    const [active, setActive] = useState(props.active);
    const [eachText, setEachText] = useState('');
    const [isWriting, setIsWriting] = useState(false);
    const [isOtherWriting, setIsOtherWriting] = useState(false);
    const tag = props.tag;
    const name = props.name;
    const password = props.password;
    const gender = props.gender;
    useEffect(() => {
        axios.post("http://192.168.43.201:5000/updateWriting", { isWriting: isWriting, tag: tag })
            .then(res => {

            })
            .catch(err => { })


    }, [eachText]);

    const loadMessages = () => {
        let temp = isWriting;

        console.log(isWriting);
        axios.post("http://192.168.43.201:5000/loadMessages", { tag: tag, password: password, isWriting: temp })
            .then(res => {
                // window.scrollTo(0, document.body.scrollHeight);
                setActive(res.data.active);
                setChats(res.data.messages);
                setIsOtherWriting(res.data.isWriting);
            })
            .catch(err => { });
    }
    let t;
    let l;
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 1000);

        l = setInterval(() => {
            loadMessages();
        }, 1000);

    }, [])
    const sendText = () => {
        if (eachText.length != 0)
            axios.post("http://192.168.43.201:5000/sendText", { tag: tag, password: password, text: eachText })
                .then(res => {
                    setChats([...chats, res.data.message])
                    setEachText('')
                    window.scrollTo(0, document.body.scrollHeight);
                })
                .catch(err => { });
    }
    const change = () => {
        console.log("change")
        setIsWriting("goru sala")
    }

    return (
        <div className='mainBox'>
            <div className="navbar1">
                <strong>{name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}</strong>
                {active ? (<div style={{ position: 'relative', float: 'right' }}><p style={{ color: 'green', left: '70%' }}>Active</p></div>) : ('')}
            </div>
            <br></br>
            <br></br>
            {chats.map(each => {
                if (each._id != 1 && each._id != 2) {
                    return (
                        <div key={each._id} >
                            {
                                each.tag == gender ? (<>
                                    <div className="bubbleWrapper">
                                        <div className="inlineContainer own">
                                            <div className="ownBubble own">
                                                {each.text}
                                            </div>
                                        </div>
                                    </div>
                                </>) : (
                                        <>
                                            <div className="bubbleWrapper">
                                                <div className="inlineContainer">
                                                    <div className="otherBubble other">
                                                        {each.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }

                        </div>
                    )
                }
                return (
                    <>
                    </>
                )
            })}
            {
                isOtherWriting ? (
                    <div className="writing">
                        <div class="spinner">
                            <div class="bounce1"></div>
                            <div class="bounce2"></div>
                            <div class="bounce3"></div>
                        </div>

                    </div>
                ) : (
                        <></>
                    )
            }

            <br></br>
            <br></br>
            <br></br>

            <div className='launchBar'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Type a message" onChange={(e) => {
                        setEachText(e.target.value);
                        change()
                        clearTimeout(t);
                        t = setTimeout(() => {
                            setIsWriting(false);
                        }, 3000);
                        setIsWriting(true)
                    }} value={eachText} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" onClick={sendText}><strong>send</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChatBox;