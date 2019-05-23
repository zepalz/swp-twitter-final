const cors = require('cors')
const express = require('express')
const Twitter = require('twitter');
const firebase = require('./firebase')

const socketIO = require('socket.io')

const app = express()
const T = new Twitter({
    consumer_key: 'zMdSN5Q6wNyyn2UZCjykoM8Ax',
    consumer_secret: 'eEXvnqEXhsKGr7CxTdCo9UbiIDkpjm5On9ScO3G7zFuGsNYugL',
    access_token_key: '4632522674-mdMGg34In4tgn7mzwU2zXYH9aBYxfPZalg2pCbZ',
    access_token_secret: 'TntQVzKeUYqak6rS8AEVRaXkJjFOsldmOUpj9e3ckDyE3'
});

const port = process.env.PORT || '8000';

app.use(cors())
app.get("/", (req, res) => {
    res.send("TEST");
});


const server = app.listen(port, () => {
    console.log('Server is listening at ' + port)
})

const socketIOServer = socketIO.listen(server)
socketIOServer.on('connection', client => {
    console.log('user connected')
    client.on('disconnect', () => {
        console.log('user disconnected')
    })
})

let countTweet = { createdAt: Date.now(), count: 0 }

setInterval(() => {
    firebase.database().ref('/tweets/').push(countTweet)
    socketIOServer.sockets.emit('data', countTweet)
    countTweet = { createdAt: Date.now(), count: 0 }
}, 60 * 1000)

setTimeout(() => {
    const stream = T.stream('statuses/filter', { track: '#tradewar' })
    stream.on('data', function (event) {
        if (event) {
            countTweet.count++
            console.log(countTweet);
        }
    })
}, 0)
// }, 5 * 60 * 1000)
