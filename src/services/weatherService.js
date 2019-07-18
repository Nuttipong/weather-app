import { TempTransformer } from '../utils/tempTransformer';
import weatherApi from '../api/weatherApi';

export default class WeatherService {
    static fetchWeather() {
        let viewModel = {
            fData: [],
            cData: [],
            city: {}
        };
        return new Promise((resolve) => {
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
                    fData: resp.list,
                    cData,
                    city: resp.city
                };
                resolve(viewModel);
            });
        }).catch((err) => { throw err; });
    }
}