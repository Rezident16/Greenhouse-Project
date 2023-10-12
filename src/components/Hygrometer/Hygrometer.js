import ReactSlider from "react-slider";
import "./Hygrometer.css";
import {useClimate} from '../../context/ClimateContext'
import { useState, useEffect } from "react";

function Hygrometer() {

  const {humidity, setHumidity} = useClimate()

  const [state, setState] = useState(humidity) // temp is the final goal
  
  useEffect(() => {
    setTimeout(() => {
      if (humidity < state) {
        setState((prev) => prev - 2)
      } else if (humidity > state) {
        setState((prev) => prev + 2)
      }
    }, 100)
  },[humidity, state])

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {state}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => {setHumidity(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
