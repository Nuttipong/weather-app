import weatherService from './weatherService';
import weatherApi from '../api/weatherApi';
import mockData from '../test/mock/data.json';

jest.mock('../api/weatherApi');

describe('weatherService', () => {

    it('should called fetchWeather as expected', (done) => {
        // given
        const mockFetchWeatherFahrenheitBased = jest.fn();
        // and
        mockFetchWeatherFahrenheitBased.mockReturnValueOnce(Promise.resolve(mockData));
        // and
        weatherApi.fetchWeatherFahrenheitBased = mockFetchWeatherFahrenheitBased;
        // when
        weatherService.fetchWeather().then((resp) => {
            // then
            expect(resp).toBeDefined();
            // and
            expect(resp.cData).toBeArray();
            // and
            expect(resp.fData).toBeArray();
            // and
            expect(resp.city).toBeObject();
            done();
        });
    });

    it('should called fetchWeather as expected once error', (done) => {
        // given
        const fakeError = new Error('fake error');
        const mockFetchWeatherFahrenheitBased = jest.fn();
        // and
        mockFetchWeatherFahrenheitBased.mockReturnValueOnce(Promise.reject(fakeError));
        // and
        weatherApi.fetchWeatherFahrenheitBased = mockFetchWeatherFahrenheitBased;
        // when
        weatherService.fetchWeather().catch((err) => {
            // then
            expect(err).toBeDefined();
            // and
            expect(err).toBe(fakeError);
            done();
        });
    });
});