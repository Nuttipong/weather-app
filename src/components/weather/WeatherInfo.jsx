import React from 'react';
import PropTypes from 'prop-types';
import { LeftArrow } from '../common/LeftArrow';
import { RightArrow } from '../common/RightArrow';
import WeatherCardList from './WeatherCardList';
import Grid from '@material-ui/core/Grid';

export class WeatherInfo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container direction="row" alignItems="flex-start" justify="space-between">
                    <Grid item>
                        <LeftArrow 
                            clickAble={this.props.prevClickAble}
                            size={72}
                            onClick={this.props.prevClickAble ? this.props.prev() : null}
                        />
                    </Grid>
                    <Grid item>
                        <RightArrow 
                            clickAble={this.props.nextClickAble}
                            size={72}
                            onClick={this.props.nextClickAble ? this.props.next() : null}
                        />
                    </Grid>
                </Grid>
                <WeatherCardList
                    model={this.props.tempModel}
                    pageSize={this.props.pageSize}
                    startIndex={this.props.startIndex}
                    onClickMoreDetail={this.props.onClickMoreDetail}
                />
            </div>
        );
    }
}

WeatherInfo.propTypes = {
    prevClickAble: PropTypes.bool.isRequired,
    nextClickAble: PropTypes.bool.isRequired,
    tempModel: PropTypes.array.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    startIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onClickMoreDetail: PropTypes.func.isRequired
};

export default WeatherInfo;