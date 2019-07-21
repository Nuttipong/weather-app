import weatherApi, { openWeatherApiUrl } from './weatherApi';

describe('weatherApi', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should called fetchWeatherFahrenheitBased properly', (done) => {
        // given
        fetch.mockResponseOnce(JSON.stringify({ fake: '12345' }));
        // when
        weatherApi.fetchWeatherFahrenheitBased().then((resp) => {
            // then
            expect(resp.fake).toEqual('12345');
            done();
        });
        // and
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual(openWeatherApiUrl);
    });

    it('should called fetchWeatherFahrenheitBased with reject properly', (done) => {
        // given
        fetch.mockResponseOnce('fake');
        // when
        weatherApi.fetchWeatherFahrenheitBased().then().catch((err) => {
            // then
            expect(err).toBeDefined();
            done();
        });
    });
});