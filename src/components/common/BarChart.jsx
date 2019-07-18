import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

export default class BarChart extends React.PureComponent {

    constructor(props) {
        super(props);
        
    }

    render() {
        const options = {
            chart: { type: 'column' },
            title: { text: this.props.title || '' },
            xAxis: {
              categories: [...this.props.categories],
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                  text: this.props.yAxis || ''
              }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [...this.props.data]
        };

        return (
            <HighchartsReact 
              highcharts={Highcharts} 
              options={options}
            />
        );
    }
}

BarChart.propTypes = {
    title: PropTypes.string,
    yAxis: PropTypes.string,
    categories: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};