// import React from "react";

// class LocationCell extends React.Component {
//   render() {
//     return (
//       <div className="vehicleCell">
//         <div className="vehicleBox">
//           <label>Location Name</label>
//           <h4>{this.props.location.name}</h4>
//         </div>
//         <div className="vehicleBox">
//           <label>Capacity</label>
//           <h4>{this.props.location.capacity}</h4>
//         </div>
//         <div className="vehicleBox">
//           <label>Address</label>
//           <h4>{this.props.location.address.address}</h4>
//         </div>
//         <div className="vehicleBox">
//           <label>Available Vehicles</label>
//           <h4>{this.props.location.numOfVehicles}</h4>
//         </div>
//         <div className="vehicleBox">
//           <button className="btn btn-primary">View</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default LocationCell;



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
  
  const locationCellClicked = (e) => {
    e.preventDefault()
    props.moveToLocationDetail(props.location)
  }

  return (
    
    <Card className={classes.root } variant="outlined">
    <div style = {{margin : "16px auto"}}>
      <CardContent> 
        <Typography variant="h5" component="h2">
        <b>{props.location.name}</b>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Location has a capacity of <b>{props.location.capacity}</b>
        </Typography>
        <Typography className={classes.pos}variant="body2" component="p">
          Location is at <b>{props.location.address.address}</b>
        </Typography>
        <Typography variant="body2" component="p">
          Vehicle count at location is <b>{props.location.numOfVehicles}</b>
        </Typography>
      </CardContent>
      </div>
      <CardActions>
        <Button size="small" color="primary" onClick={locationCellClicked}>View</Button>
      </CardActions>
    </Card>
  );
}

