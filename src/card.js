import React, { Component } from "react";

class Card extends Component {
  render() {
    const { age } = this.props;
    return (
      <div>
        <h3>Im {age}!</h3>
      </div>
    );
  }
}

export default Card;
