class WeatherApi {

    static fetchWeather() {
        return new Promise((resolve) => {
            Promise.all([
                this.fetchWeatherFahrenheitBased(),
                this.fetchWeatherCelciusBased()
            ]).then((resp) => {
                resolve({
                    fData: (resp && resp[0]) ? resp[0].list || [] : [],
                    cData: (resp && resp[1]) ? resp[1].list || [] : [],
                    city: (resp && resp[0]) ? resp[1].city || {} : {}
                });
            });
        });
    }

    static fetchWeatherFahrenheitBased() {
        return new Promise((resolve) => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=imperial`)
            .then((resp) => resp.json())
            .then((data) => resolve(Object.freeze(data))
            );
        });
    }

    static fetchWeatherCelciusBased() {
        return new Promise((resolve) => {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=metric`)
            .then((resp) => resp.json())
            .then((data) => resolve(Object.freeze(data))
            );
        });
    }
}

export default WeatherApi;
