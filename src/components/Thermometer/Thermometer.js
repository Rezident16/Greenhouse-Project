import ReactSlider from "react-slider";
import './Thermometer.css';
import {useClimate} from '../../context/ClimateContext.js'
import { useEffect, useState } from "react";

function Thermometer() {
  const {temp, setTemp} = useClimate()
  const [state, setState] = useState(temp) // temp is the final goal
  
  useEffect(() => {
    // set the state to the temp
    setTimeout(() => {
      if (temp < state) {
        setState((prev) => prev - 1)
      } else if (temp > state) {
        setState((prev) => prev + 1)
      }
    }, 100)
    // utilize setState to change the value by 1 degree each second
    // if (state < temp) if (state > temp)
  },[temp, state, setTemp])

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {state}°F</div>
      <ReactSlider
        value={temp}
        onAfterChange={(val) => {setTemp(val)}}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
