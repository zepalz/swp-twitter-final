import { findIndex, propEq } from 'ramda'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import moment from 'moment'
import React, { Component } from 'react'

import socketIOClient from 'socket.io-client'

class App extends Component {
    state = {
        tweets: [{ count: 0, createdAt: moment().format('YYYY-MM-DD HH') + ':00' }],
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
        console.log(this.state.tweets);

        return (
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
        )
    }
}

export default App