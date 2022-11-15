const API_KEY = '6d3642eba37903eecb6ee32b19fad9b7';
const makeIronURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherApiData = async (city,units='metric') =>{
   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
   const data = await fetch(URL).then(
       (res) => res.json()).then(
       data => data
       );
    const {weather,main:{temp,feels_like,temp_min,temp_max,pressure,humidity},wind:{speed},sys:{country},name} = data;
    const {description,icon} = weather[0];
    return {
        description,
        iconUrl:makeIronURL(icon),temp,feels_like,temp_min,temp_max,pressure,humidity,speed,country,name
    }
}
export default getFormattedWeatherApiData;
