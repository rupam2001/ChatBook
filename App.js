import React from 'react';
import { useState, useEffect } from "react";


import ChatBox from './components/chatBox.component';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import cookie from 'js-cookie';

function App() {
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [dontGetIn, setdontGetIn] = useState(true);
  const [active, setActive] = useState(false);
  const [gender, setGender] = useState('');
  const getFromCookie = () => {
    setTag(typeof cookie.get('tag') == 'undefined' ? '' : cookie.get('tag'));
    setPassword(typeof cookie.get('password') == 'undefined' ? '' : cookie.get('password'));
    setName(typeof cookie.get('name') == 'undefined' ? '' : cookie.get('name'))
    Axios.post("http://192.168.43.201:5000/login", { tag: typeof cookie.get('tag') == 'undefined' ? '' : cookie.get('tag'), password: typeof cookie.get('password') == 'undefined' ? '' : cookie.get('password') })
      .then(res => {
        setActive(res.data.active);
        setName(res.data.partner);
        setGender(res.data.gender);
        cookie.set('tag', tag, { expires: 7 });
        cookie.set('name', res.data.partner, { expires: 7 });
        cookie.set('password', password, { expires: 7 });
        setdontGetIn(false);
      })
      .catch(err => { });

  }

  useEffect(getFromCookie, []);



  const login = () => {
    if (tag.length != 0 && password.length != 0) {
      Axios.post("http://192.168.43.201:5000/login", { tag: tag, password: password })
        .then(res => {
          setActive(res.data.active);
          setName(res.data.partner);
          setGender(res.data.gender);
          cookie.set('tag', tag, { expires: 7 });
          cookie.set('name', res.data.partner, { expires: 7 });
          cookie.set('password', password, { expires: 7 });
          setdontGetIn(false);
        })
        .catch(err => { });

    }
  }


  return (
    <div>
      {
        dontGetIn ? (
          <div className='jumbotron'>
            <div className="input ">
              <input type="text" className="form-control" placeholder="User" onChange={(e) => setTag(e.target.value)} />
              <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              <button className='btn btn-primary' style={{ margin: '0.5rem' }} onClick={login}>In</button>
            </div>
          </div>
        ) : (
            <ChatBox tag={tag} name={name} active={active} password={password} gender={gender} />
          )
      }



    </div>
  );
}

export default App;
