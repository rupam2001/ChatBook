const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
let messages = [{ _id: 1, tag: 'he', text: 'His message' }, { _id: 2, tag: 'she', text: 'Her message' }];

let users = [{ tag: "rupam", password: 1234 }, { tag: 'alexa', password: 4321 }];

let session = [{ tag: 'he', active: false }, { tag: 'she', active: false }];

let writing = [{ tag: 'he', isWriting: false }, { tag: 'she', isWriting: false }];



function idGenerator() {
    let number = parseInt(Math.random() * 100000);
    return number;
}



app.post("/login", (req, res) => {

    const tag = req.body.tag;
    const password = req.body.password;
    // console.log(tag, password);
    if (typeof tag != 'undefined' && typeof password != 'undefined') {
        if (tag.toLowerCase() == users[0].tag && password == users[0].password) {   ///he
            session[0].active = true;
            // setTimeout(() => { session[0].active = false }, 5000);
            res.json({ success: true, active: session[1].active, partner: users[1].tag, gender: 'he' });

        }
        else if (tag.toLowerCase() == users[1].tag && password == users[1].password) {  //she

            session[1].active = true;
            // setTimeout(() => { session[1].active = false }, 5000);
            res.json({ success: true, active: session[0].active, partner: users[0].tag, gender: 'she' });

        }
        else {
            res.status(500).json({ success: false });
        }
    } else {
        res.status(500).json({ success: false });
    }
});

let t1 = setTimeout(() => { session[0].active = false; console.log('falsed rupam') }, 6000);
let t2 = setTimeout(() => { session[1].active = false; console.log("falsed alexa") }, 5000);

app.post('/loadMessages', (req, res) => {
    const tag = req.body.tag;
    const password = req.body.password;
    // const isWriting = req.body.isWriting;
    // console.log(tag, password);
    if (typeof tag != 'undefined' && typeof password != 'undefined') {

        if (tag.toLowerCase() == users[0].tag && password == users[0].password) {   ///he
            session[0].active = true;

            clearTimeout(t1)
            t1 = setTimeout(() => { session[0].active = false; writing[0].isWriting = false }, 6000);
            res.json({ success: true, active: session[1].active, partner: users[1].tag, messages: messages, isWriting: writing[1].isWriting });
            // console.log('hi')

        }
        else if (tag.toLowerCase() == users[1].tag && password == users[1].password) {  //she

            session[1].active = true;
            // writing[1].isWriting = isWriting
            clearTimeout(t2);
            t2 = setTimeout(() => { session[1].active = false; writing[1].isWriting = false }, 5000);
            res.json({ success: true, active: session[0].active, partner: users[0].tag, messages: messages, isWriting: writing[0].isWriting });
            // console.log('by')
        }
        else {
            res.status(500).json({ success: false });
        }
    } else {
        res.status(500).json({ success: false });
    }
})



app.post("/sendText", (req, res) => {
    const tag = req.body.tag;
    const password = req.body.password;
    const text = req.body.text;
    // console.log('heeee');
    if (typeof tag != 'undefined' && typeof password != 'undefined') {

        if (tag.toLowerCase() == users[0].tag && password == users[0].password) {   ///he
            messages.push({ _id: idGenerator(), tag: 'he', text: text });
            res.json({ message: { _id: idGenerator(), tag: 'he', text: text } })

        }
        else if (tag.toLowerCase() == users[1].tag && password == users[1].password) {  //she

            messages.push({ _id: idGenerator(), tag: 'she', text: text });
            res.json({ message: { _id: idGenerator(), tag: 'she', text: text } })

        }
        else {
            res.status(500).json({ success: false });
        }
    } else {
        res.status(500).json({ success: false });
    }
})

let t3 = setTimeout(() => { writing[0].isWriting = false }, 6000);
let t4 = setTimeout(() => { writing[1].isWriting = false }, 5000);

app.post("/updateWriting", (req, res) => {
    const isWriting = req.body.isWriting;
    if (req.body.tag == users[0].tag) {
        writing[0].isWriting = isWriting;
        clearTimeout(t3);
        t3 = setTimeout(() => { writing[0].isWriting = false }, 3000);


    }
    else if (req.body.tag == users[1].tag) {
        writing[1].isWriting = isWriting;
        clearTimeout(t4);
        t4 = setTimeout(() => { writing[1].isWriting = false }, 3000);
    }

    res.json({})
});
app.listen(5000, () => console.log("server is running at port 5000"));