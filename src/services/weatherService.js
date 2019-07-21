import { TempTransformer } from '../utils/tempTransformer';
import weatherApi from '../api/weatherApi';
import { TemperatureUnit } from '../constants/temperature';
import _ from 'lodash';
import moment from 'moment';

export default class WeatherService {
    static fetchWeather() {
        let viewModel = {
            fData: [],
            cData: [],
            city: {}
        };
        return new Promise((resolve, reject) => {
            weatherApi.fetchWeatherFahrenheitBased().then((resp) => {
                const cData = resp.list ? resp.list.map((data) => {
                    return Object.assign({}, data, {
                        ...data,
                        main: {
                            ...data.main,
                            temp: TempTransformer.convertFToC(data.main.temp),
                            temp_min: TempTransformer.convertFToC(data.main.temp_min),
                            temp_max: TempTransformer.convertFToC(data.main.temp_max)
                        }
                    });
                }) : [];
                viewModel = {
                    fData: this.mapViewModel(resp.city, resp.list, TemperatureUnit.FAHRENHEIT),
                    cData: this.mapViewModel(resp.city, cData, TemperatureUnit.CELCIUS),
                    city: resp.city
                };
                resolve(viewModel);
            }).catch((err) => { reject(err); });
        }).catch((err) => { throw err; });
    }

    static mapViewModel(city, list, unit) {
        const cityName = city.name || '';
        const data = list;
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
        return tempModel;
    }
}