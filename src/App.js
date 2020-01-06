import React, { Component } from 'react';
import { TweetBody } from './components/tweet.js'
import {PullToRefresh, PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      users:
      [ 
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  handleRefresh() {
    return new Promise((resolve) => {
      this.getUser()
    });
  }

  componentWillMount() {
    this.getUser()
  }

  getUser() {
    fetch('https://randomuser.me/api/?results=50')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({
        users:data.results,
      },()=>console.log(this.state.users));
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <PullToRefresh
      pullDownContent={<PullDownContent />}
      releaseContent={<ReleaseContent />}
      refreshContent={<RefreshContent />}
      pullDownThreshold={2}
      onRefresh={this.handleRefresh}
      triggerHeight={50}
      backgroundColor='black'>
      <div className="main-body">
        {[...this.state.users].map((user, index) => {
          let name = `${user.name.first} ${user.name.last}`
          let handle = `@${user.name.first}${user.name.last}`
          let image = user.picture.medium
          /* let tweet = user.tweet */
          let tweet = "Hi this is "+user.name.first;
          console.log(image)
          return(
            <TweetBody 
              key={index}
              name={name}
              handle={handle}
              tweet={tweet}
              image={image} />
          )
        })}      
      </div>
      </PullToRefresh>
    );
  }
}

export default App;
