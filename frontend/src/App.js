import { findIndex, propEq } from 'ramda'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import React, { Component } from 'react'

import socketIOClient from 'socket.io-client'

class App extends Component {
    state = {
        tweets: [
            { count: 0, createdAt: '00:00' },
            { count: 0, createdAt: '01:00' },
            { count: 0, createdAt: '02:00' },
            { count: 0, createdAt: '03:00' },
            { count: 0, createdAt: '04:00' },
            { count: 0, createdAt: '05:00' },
            { count: 0, createdAt: '06:00' },
            { count: 0, createdAt: '07:00' },
            { count: 0, createdAt: '08:00' },
            { count: 0, createdAt: '09:00' },
            { count: 0, createdAt: '10:00' },
            { count: 0, createdAt: '11:00' },
            { count: 0, createdAt: '12:00' },
            { count: 0, createdAt: '13:00' },
            { count: 0, createdAt: '14:00' },
            { count: 0, createdAt: '15:00' },
            { count: 0, createdAt: '16:00' },
            { count: 0, createdAt: '17:00' },
            { count: 0, createdAt: '18:00' },
            { count: 0, createdAt: '19:00' },
            { count: 0, createdAt: '20:00' },
            { count: 0, createdAt: '21:00' },
            { count: 0, createdAt: '22:00' },
            { count: 0, createdAt: '23:00' },
        ],
        endpoint: "localhost:8000"
    }

    componentDidMount = () => {
        const { endpoint, tweets } = this.state
        const temp = tweets
        const socket = socketIOClient(endpoint)
        socket.on('data', (newTweet) => {
            const index = findIndex(propEq('createdAt', newTweet.createdAt))(tweets)
            if (index >= 0) {
                tweets[index].count++
            } else {
                temp.push({ count: 1, createdAt: newTweet.createdAt })
            }
            this.setState({ tweets: temp })
        })
    }

    render() {
        return (
            <div style={{ textAlign: 'center'}}>
                <h1>Today's #Tradewar Count</h1>
                <LineChart
                    width={1000}
                    height={600}
                    data={this.state.tweets}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
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