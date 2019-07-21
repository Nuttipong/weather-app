import React from 'react';
import Proptypes from 'prop-types';

export class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.timer = this.timer.bind(this);
        this.intervalId = 0;
        this.state = {
            currentCount: 0
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    timer() {
        if (this.props.loading === 1) {
            let currentCount = this.state.currentCount + 1;
            if (currentCount === 3) {
                currentCount = 0;
            }
            this.setState({
                currentCount
            });
        }
    }

    getDot(count) {
        const map = {
            0: '.',
            1: '..',
            2: '...'
        };
        return map[count] || '.';
    }

    renderWithLoading(count) {
        const lastDot = this.getDot(count);
        return `Loading ${lastDot}`;
    }

    render() {
        const currentCount = this.state.currentCount;
        return (
            this.props.loading > 0 && this.renderWithLoading(currentCount)
        );
    }
}

Loading.propTypes = {
    loading: Proptypes.number.isRequired
};