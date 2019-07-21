import { TemperatureType } from '../constants/temperature';

export default {
    loading: 0,
    weather: {
        city: {},
        tempType: TemperatureType.FAHRENHEIT,
        fData: [],
        cData: [],
        currentSelectedIndex: 0
    }
};
