let tempArray = [];
let humidityArray = [];

export const insertValues = (temperature, humidity) => {
  tempArray.push(temperature);
  humidityArray.push(humidity);
};

export const calculateAverage = () => {
  const calculateArrayAverage = (arr) => {
    if (arr.length === 0) {
      return 0;
    }
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  };

  const avgTemperature = calculateArrayAverage(tempArray);
  const avgHumidity = calculateArrayAverage(humidityArray);

  return {
    averageTemperature: avgTemperature,
    averageHumidity: avgHumidity
  };
};
