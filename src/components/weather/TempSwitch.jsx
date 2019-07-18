import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { TemperatureType } from '../../constants/temperature';

export default class TempSwitch extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container direction="row" alignItems="flex-start" justify="center">
            <Grid item>
                <RadioGroup
                    value={this.props.tempType} 
                    onChange={this.props.handleChange} 
                    row>
                        <FormControlLabel
                            style={{ marginRight: 100 }}
                            value={TemperatureType.CELCIUS}
                            control={<Radio color="primary" />}
                            label={TemperatureType.CELCIUS}
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            style={{ marginLeft: 100 }}
                            value={TemperatureType.FAHRENHEIT}
                            control={<Radio color="primary" />}
                            label={TemperatureType.FAHRENHEIT}
                            labelPlacement="end"
                        />
                </RadioGroup>
            </Grid>
        </Grid>
        );
    }
}

TempSwitch.propTypes = {
    tempType: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};