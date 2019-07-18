import { TemperatureType } from '../constants/temperature';

export default {
    loading: 0,
    weather: {
        city: {},
        tempModel: [],
        tempType: TemperatureType.FAHRENHEIT,
        fData: [],
        cData: []
    }
};
