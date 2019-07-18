import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { TemperatureType, TemperatureUnit } from '../../constants/temperature';
import Container from '@material-ui/core/Container';
import { bindActionCreators } from 'redux';
import * as weatherActions from '../../actions/weatherActions';
import BarChart from '../common/BarChart';
import TempSwitch from './TempSwitch';
import WeatherInfo from './WeatherInfo';

const mapStateToProps = (state) => {

    const data = (state.weather.tempType === TemperatureType.FAHRENHEIT ? state.weather.fData : state.weather.cData);
    const unit = state.weather.tempType === TemperatureType.FAHRENHEIT ? TemperatureUnit.FAHRENHEIT : TemperatureUnit.CELCIUS;
    const cityName = state.weather.city.name || '';
    const groupOfDate = _.groupBy(data, (weather) => {
        return moment(weather.dt_txt).startOf('day').format();
    });
    const tempModel = Object.values(groupOfDate).map((date, index) => {
        let tempMin = [], tempMax = [];
        const avgTemp = (minAvg, maxAvg) => Math.round((minAvg + maxAvg) / 2).toFixed(0);
        const formatDate = (date) => moment(date).format('DD MMM YY');
        date.map((obj) => {
            tempMin.push(obj.main.temp_min);
            tempMax.push(obj.main.temp_max);
        });
        tempMin = Math.min(...tempMin);
        tempMax = Math.max(...tempMax);
        return {
            idx: index,
            tempAvgPerDay: avgTemp(tempMin, tempMax),
            date: formatDate(date[0].dt_txt),
            city: cityName,
            unit: unit,
            dateSegment: date
        };
    });

    return {
        city: state.weather.city,
        tempModel: tempModel || [],
        tempType: state.weather.tempType,
        currentSelectedIndex: state.weather.currentSelectedIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(weatherActions, dispatch)
    };
};

export class WeatherScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startIndex: 0,
            pageSize: 3,
            graphModel: {
                categories: [],
                data: [],
                title: '',
                yAxis: '',
                date: ''
            },
            currentSelectedIndex: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        
        this.next = () => (ev) => {
            ev.preventDefault();
            this.nextClick();
        };
        
        this.prev = () => (ev) => {
            ev.preventDefault();
            this.prevClick();
        };

        this.clickMoreDetail = (idx) => (ev) => {            
            const gData = this.props.tempModel.find((td) => td.idx === idx);
            this.renderGraph(gData, idx);
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentSelectedIndex !== state.currentSelectedIndex) {
            return {
                currentSelectedIndex: state.currentSelectedIndex,
            };
        }
        return null;
    }

    componentDidMount() {
        let gData = [];
        if (this.props.tempModel.length === 0) {
            this.props.actions.loadWeather()
            .then(() => {
                gData = this.props.tempModel[0] || [];
                this.renderGraph(gData);
            });
        } else {
            gData = this.props.tempModel[0];
            this.renderGraph(gData);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentSelectedIndex !== prevProps.currentSelectedIndex) {
            const gData = this.props.tempModel.find((td) => td.idx === this.props.currentSelectedIndex);
            this.renderGraph(gData, this.props.currentSelectedIndex);
        }
      }

    renderGraph(gData, idx = 0) {
        let data = [], segments = [], labels = [];
        gData.dateSegment.forEach((d) => {
            const formatDate = (date) => moment(date).format('hh:mm A');
            segments.push(d.main.temp_max);
            labels.push(formatDate(d.dt_txt));
        });
        data.push({
            name: 'Temperature',
            data: [...segments]
        });
        this.setState({
            graphModel: {
                categories: labels,
                data: data,
                date: gData.date
            },
            currentSelectedIndex: idx
        });
    }

    handleChange(event) {
        this.props.actions.changeWeather(event.target.value, this.state.currentSelectedIndex);
    }

    prevClick() {
        let val = this.state.startIndex - this.state.pageSize;
        if (val <= 0) {
            val = 0;
        }
        this.setState({
            startIndex: val
        });
    }

    nextClick() {
        let val = this.state.startIndex + this.state.pageSize;
        if (val >= this.props.tempModel.length) {
            val = this.state.startIndex;
        }
        this.setState({
            startIndex: val
        });
    }

    clickAble(type) {
        let clickAble = false;
        if (type === 'prev') {
            if (this.state.startIndex > 0) {
                clickAble = true;
            }
        }
        if (type === 'next') {
            if (this.state.startIndex + this.state.pageSize < this.props.tempModel.length)
            clickAble = true;
        }
        return clickAble;
    }

    render() {

        const prevClickAble = this.clickAble('prev');
        const nextClickAble = this.clickAble('next');

        return (
            <div style={{ flexGrow: 1, width: '100%', marginTop: '10vh' }}>
                <Container maxWidth="xl">

                    <TempSwitch 
                        tempType={this.props.tempType}
                        handleChange={this.handleChange}
                    />

                    <WeatherInfo 
                        prevClickAble={prevClickAble}
                        nextClickAble={nextClickAble}
                        tempModel={this.props.tempModel}
                        prev={this.prev}
                        next={this.next}
                        startIndex={this.state.startIndex}
                        pageSize={this.state.pageSize}
                        onClickMoreDetail={this.clickMoreDetail}
                    />

                    <BarChart
                        title={`Forecast of ${this.props.city.name}<br/>${this.state.graphModel.date}`}
                        yAxis={this.props.tempType}
                        categories={this.state.graphModel.categories}
                        data={this.state.graphModel.data}
                    />

                </Container>
            </div>
        );
    }
}

WeatherScreen.propTypes = {
    city: PropTypes.object.isRequired,
    tempModel: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    tempType: PropTypes.string.isRequired,
    currentSelectedIndex: PropTypes.number.isRequired
};
  
export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
