import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
  },
  title: {
    fontSize: 14,
    paddingBottom: 20
  },
  button: {
    fontSize: 10,
  }
}));

export default function WeatherCard(weather) {
  const classes = useStyles();
  const { city, tempAvgPerDay, unit, date, onClickMoreDetail, idx } = weather;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {city || ''}
        </Typography>
        <Typography variant="h5" component="h2">
            Temp: {tempAvgPerDay + unit}
        </Typography>
        <Typography variant="h5" component="h2">
            Date: {date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClickMoreDetail(idx)} size="small" className={classes.button}>More detail...</Button>
      </CardActions>
    </Card>
  );
}

WeatherCard.propTypes = {
  city: PropTypes.string.isRequired,
  tempAvgPerDay: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClickMoreDetail: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired
};