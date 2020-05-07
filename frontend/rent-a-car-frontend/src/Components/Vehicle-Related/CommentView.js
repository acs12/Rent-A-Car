import React from "react";

class CommentView extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate(dateString) {
    let date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  render() {
    let vehicleComments = this.props.comments.map(c => {
      return (
        <div className = 'card' style = {{margin : "8px 0px", padding : 8}}>
          <div>
            {c.comment} on <small><b>{this.formatDate(c.timestamp)}</b></small>
          </div>
          
        </div>
      );
    });

    return (
      <div style={{ padding: 16 }}>
        <div>
          <h5>User Reviews and Feedbacks</h5>
        </div>
        {vehicleComments}
      </div>
    );
  }
}

export default CommentView;
