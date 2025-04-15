import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Welcome to JP Thinks</h1>
        <p>Check out our weather page for current Jacksonville weather conditions!</p>
      </div>
    );
  }
}
