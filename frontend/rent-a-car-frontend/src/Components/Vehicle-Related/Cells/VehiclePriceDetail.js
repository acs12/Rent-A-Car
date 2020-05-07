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

  return (
    <Card className={classes.root} variant="outlined">
      <div style={{ margin: "16px auto" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <b>{props.vehicle.carname}</b>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           Available at <b>{props.vehicle.rentalLocation && props.vehicle.rentalLocation.name}</b>
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
          with hourly rate of <b>${props.vehicle.type &&  props.vehicle.type.hourlyRate}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 1 hour <b>${props.vehicle.type.hour1}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 6 hours <b>${props.vehicle.type.hour6}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 11 hours <b>${props.vehicle.type.hour11}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 16 hours <b>${props.vehicle.type.hour16}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 1 Day <b>${props.vehicle.type.day1}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 2 Days <b>${props.vehicle.type.day2}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          for 3 Days <b>${props.vehicle.type.day3}</b>
          </Typography>

          <Typography className={classes.pos} variant="body2" component="p">
          If you miss then late fees of <b>${props.vehicle.type.lateFee}</b>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
