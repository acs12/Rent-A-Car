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
            <b>{props.reservation.vehicle && props.reservation.vehicle.carname}</b>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          {props.reservation.returned ? 'Picked up from' : 'To be picked up from' } <b>{props.reservation.pickupLocation && props.reservation.pickupLocation.name}</b>
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
            {props.reservation.returned ? 'Dropped at' : 'To be dropped at' } <b>{props.reservation.returnLocation && props.reservation.returnLocation.name}</b>
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
            {props.reservation.returned && <b>{props.reservation.status}</b> } 
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
          {props.reservation.returned && 'You Paid' && <b>${props.reservation.totalPrice}</b> } 
        </Typography>

        </CardContent>
      </div>
      <CardActions>
        {props.reservation.returned === false && (
          <div>
          {props.reservation.pickupTime <= Date.now() && 
            <Button size="small" color="primary" onClick={onCarReturn}>
            Return Car
          </Button>
          }
          <Button size="small" color="primary" onClick={onCancelBooking}>
            Cancel Car
          </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
