import React, { Component } from 'react';
import { Ball } from './Ball';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { 
      currentCount: 0,
      balls: []
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState(prevState => ({
      currentCount: prevState.currentCount + 1,
      balls: [
        ...prevState.balls,
        {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 20) // Random X position
        }
      ]
    }));

    // Remove balls after animation
    setTimeout(() => {
      this.setState(prevState => ({
        balls: prevState.balls.slice(1)
      }));
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>

        {this.state.balls.map(ball => (
          <Ball key={ball.id} startX={ball.x} />
        ))}
      </div>
    );
  }
}
