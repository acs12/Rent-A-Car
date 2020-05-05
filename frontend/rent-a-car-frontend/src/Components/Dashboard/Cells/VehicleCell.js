// import React from "react";
// import { setCurrentVehicle } from "../../../redux/actions/setAction";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import "../../../styles/dashboard.styles.css";

// class VehicleCell extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.moveToVehicleSelection = this.moveToVehicleSelection.bind(this);
//   }

//   moveToVehicleSelection(e) {
//     e.preventDefault();

//     if (this.props.bookVehicle !== undefined) {
//       return this.props.bookVehicle(this.props.vehicle)
//     }

//     this.setState(
//       {
//         moveToVehicleDetail: true
//       },
//       () => {
//         this.props.setCurrentVehicle(this.props.vehicle);
//       }
//     );
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
//             <label>Name</label>
//             <h4>{this.props.vehicle.carname}</h4>
//           </div>
//           <div className="vehicleBox">
//             <label>Type</label>
//             <h4>{this.props.vehicle.type.category}</h4>
//           </div>
//           <div className="vehicleBox">
//             <label>Rent</label>
//             <h4>{this.props.vehicle.type.hourlyRate}</h4>
//           </div>
//           <div className="vehicleBox">
//             <label>Available At</label>
//             <h4>
//               {this.props.vehicle.rentalLocation !== null &&
//                 this.props.vehicle.rentalLocation.name}
//             </h4>
//           </div>
//           <div className="vehicleButton" style = {{float : 'right'}}>
//             <button
//               className="btn btn-primary"
//               onClick={this.moveToVehicleSelection}
//             >
//               Book
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(null, { setCurrentVehicle })(VehicleCell);



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  
  const vehicleCellClicked = (e) => {
    e.preventDefault()
    props.moveToVehicleSelection(props.vehicle)
  }

  return (
    
    <Card className={classes.root } variant="outlined">
    <div style = {{margin : "16px auto"}}>
      <CardContent> 
        <Typography variant="h5" component="h2">
        <b>{props.vehicle.carname}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {props.vehicle.type.category}
        </Typography>
        <Typography className={classes.pos}variant="body2" component="p">
          ${props.vehicle.type.hourlyRate}/hour
        </Typography>
        <Typography variant="body2" component="p">
          {props.vehicle.condition}
        </Typography>
      </CardContent>
      </div>
      <CardActions>
        <Button size="small" color="primary" onClick={vehicleCellClicked}>Book</Button>
      </CardActions>
    </Card>
  );
}
