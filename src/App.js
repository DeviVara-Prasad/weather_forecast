import hot from './assests/hot.jpg';
import cold from './assests/cold.jpg';
import Descriptions from './components/Descriptions';
import React, {useEffect} from 'react';
import getFormattedWeatherApiData from './weatherService';
function App() {
  const [city,setCity] = React.useState("hyderabad");
  const [weather,setWeather] = React.useState(null);
  const [units,setUnits] = React.useState("metric");
  const [bg,setBg] = React.useState(hot);
  useEffect(
    ()=>{
      const fetchWeatherData = async ()=>{
        const data = await getFormattedWeatherApiData(city,units);
        console.log(data);
        setWeather(data);
        const threshold = units==='metric'?20:60;
      setBg(data.temp<=threshold?cold:hot);
      }
      fetchWeatherData();
    },
  [city,units])
  const handleUnitClick = ()=>{
    setUnits(units==="metric"?'imperial':'metric')
  }
  const cityEntered = (e)=>{
          if(e.keyCode===13){
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
          }
  }
  return (
    <div className="App" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {weather&&(
        <div className="container">
          <div className="section section_inputs">
            <input type="text" onKeyDown={cityEntered} name="city" placeholder="Enter City..."/>
            <button onClick={handleUnitClick}>{`°${units==='metric'?'F':'C'}`}</button>
          </div>
          <div className="section section_temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={`${weather.iconUrl}`} alt="Icon"/>
              <h3>{`${weather.description}`}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units==='metric'?'C':'F'}`}</h1>
            </div>
          </div>
          <Descriptions weather={weather} units={units}/>
        </div>)}
      </div>
    </div>
  );
}

export default App;
