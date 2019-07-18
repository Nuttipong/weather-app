import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as weatherActions from '../../actions/weatherActions';
import { Loading } from '../common/Loading';
import { Navigate } from '../../constants/navigate';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(weatherActions, dispatch)
    };
};

class LoadingScreen extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.actions.loadWeather().then(() => {
            this.onNavigateToWeather();
        });
    }

    onNavigateToWeather() {
        this.props.history.push(Navigate.WEATHER);
    }

    render() {
        return (
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    { this.props.loading && <Loading loading={this.props.loading} /> || 'Loading ...' }
                </Grid>
            </Grid> 
        );
    }
}

LoadingScreen.propTypes = {
    loading: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadingScreen));