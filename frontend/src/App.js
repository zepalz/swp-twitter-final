import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import React, { Component } from 'react'

import socketIOClient from 'socket.io-client'

import firebase from './firebase'

class App extends Component {
    state = {
        tweetsFromFirebase: [],
        tweetsFromSocket: [],
        endpoint: "https://swp-final-twitter.appspot.com/"
    }

    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint)
        socket.on('data', (newTweet) => {
            const date = new Date(newTweet.createdAt)
            const tweet = {
                count: newTweet.count,
                createdAt: `${date.getHours()}:${date.getMinutes()}`
            }
            this.setState({
                tweetsFromSocket: [...this.state.tweetsFromSocket, tweet]
            })
        })
        firebase.database().ref('/tweets/').on('value', (snapshot) => {
            console.log(snapshot.val());

            this.setState({
                tweetsFromFirebase: Object.values(snapshot.val() || {}).map(tweet => {
                    const date = new Date(tweet.createdAt)
                    return {
                        count: tweet.count,
                        createdAt: `${date.getHours()}:${date.getMinutes()}`
                    }
                })
            })
        })
    }

    render() {
        return (
            <div style={{ marginLeft: 20 }}>
                <h1>#Tradewar Count VERSION 1 with SOCKET</h1>
                <LineChart
                    width={1000}
                    height={600}
                    data={this.state.tweetsFromSocket}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                <h1>#Tradewar Count VERSION 2 with FIREBASE</h1>
                <LineChart
                    width={1000}
                    height={600}
                    data={this.state.tweetsFromFirebase}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="createdAt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        )
    }
}

export default App