// import React from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import "../../../styles/dashboard.styles.css";
// import { cancelBooking } from "../../../redux/actions/bookingAction";
// import CommentModal from "../../Common/CommentModal";

// class BookingCell extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {showModal : false};
//     this.onCancelBooking = this.onCancelBooking.bind(this);
//     this.onCarReturn = this.onCarReturn.bind(this);
//   }

//   onCancelBooking(e) {
//     e.preventDefault();
//     this.props.cancelBooking(this.props.reservation._id, result => {});
//   }

//   onCarReturn(e) {
//     e.preventDefault();
//     this.props.handleReturnClick(this.props.reservation)
//   }

//   render() {
//     let navLink = undefined;
//     if (this.state.moveToVehicleDetail) {
//       navLink = <Redirect to={`vehicledetail/${this.props.vehicle._id}`} />;
//     }
//     return (
//       <div>
//         <div className="vehicleCell">
//           {navLink}
//           <div className="vehicleBox">
//             <label>Car Name</label>
//             <h4>{this.props.reservation.vehicle.carname}</h4>
//           </div>
//           <div className="vehicleBox">
//             <label>Type</label>
//             <h4>{this.props.reservation.pickupLocation.name}</h4>
//           </div>
//           <div className="vehicleBox">
//             <label>Rent</label>
//             <h4>{this.props.reservation.returnLocation.name}</h4>
//           </div>

//           {this.props.reservation.returned === false && (
//             <div>
//               <button className="btn btn-primary" onClick={this.onCarReturn}>
//                 Return Car
//               </button>

//               <button className="btn btn-red" onClick={this.onCancelBooking}>
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(null, { cancelBooking })(BookingCell);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();

   const onCancelBooking = (e) => {
    e.preventDefault();
    props.cancelBooking(props.reservation);
  }

  const onCarReturn = (e) => {
    e.preventDefault();
    props.handleReturnClick(props.reservation)
  }

  return (
    <Card className={classes.root} variant="outlined">
      <div style={{ margin: "16px auto" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>{props.reservation.vehicle.carname}</b>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          {props.reservation.returned ? 'Picked up from' : 'To be picked up from' } <b>{props.reservation.pickupLocation.name}</b>
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
            {props.reservation.returned ? 'Dropped at' : 'To be dropped at' } <b>{props.reservation.returnLocation.name}</b>
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
            {props.reservation.returned && <b>{props.reservation.status}</b> } 
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        {props.reservation.returned === false && (
          <div>
          <Button size="small" color="primary" onClick={onCarReturn}>
            Return Car
          </Button>
          <Button size="small" color="primary" onClick={onCancelBooking}>
            Cancel Car
          </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
