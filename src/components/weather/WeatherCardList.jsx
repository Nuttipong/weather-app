import React from 'react';
import WeatherCard from './WeatherCard';
import PropTypes from 'prop-types';

export const WeatherCardList = ({model, pageSize, startIndex, onClickMoreDetail}) => {
    const list = model;
    const listToShow = [];
    let limit = 0;
    for (let count = startIndex; count < list.length; count ++) {
        if (limit === pageSize) {
            break;
        }
        listToShow.push(list[count]);
        limit += 1;
    }
    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {listToShow.map((weather, index) => {
                return <WeatherCard key={index}
                            city={weather.city}
                            tempAvgPerDay={Number(weather.tempAvgPerDay)}
                            unit={weather.unit}
                            date={weather.date}
                            onClickMoreDetail={onClickMoreDetail}
                            idx={weather.idx}
                        />;
            })}
        </div>
    );
};

WeatherCardList.propTpes = {
    model: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    startIndex: PropTypes.number.isRequired,
    onClickMoreDetail: PropTypes.func.isRequired,
};

export default WeatherCardList;