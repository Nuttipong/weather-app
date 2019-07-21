export const openWeatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=imperial`;

class WeatherApi {
    static fetchWeatherFahrenheitBased() {
        return new Promise((resolve, reject) => {
            fetch(openWeatherApiUrl)
            .then((resp) => resp.json())
            .then((data) => resolve(Object.freeze(data))
            ).catch((err) => { reject(err); });
        }).catch((err) => { throw err; });
    }
}

export default WeatherApi;
