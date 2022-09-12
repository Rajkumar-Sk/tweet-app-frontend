import React, { Component } from "react";
import classes from "./Card.module.css";

class Card extends Component {
  constructor(props) {

  }
  render() {
    return (
      <div className={`${classes.card} ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
