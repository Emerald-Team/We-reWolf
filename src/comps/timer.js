import React from 'react';
import {useState, useEffect} from 'react';

const TIMER_DURATION = 6

export default function Timer({phaseIndex, setPhaseIndex, phases}) {
  const [time, setTime] = useState(TIMER_DURATION)

  function step() {
    const timestamp = Date.now() / 1000;
    const timeLeft = (TIMER_DURATION - 1) - Math.round(timestamp) % TIMER_DURATION;
    setTime(timeLeft);
    const timeCorrection = Math.round(timestamp) - timestamp;
    setTimeout(step, timeCorrection * 1000 + 1000);
  }

  useEffect(() => {
    if (time < 1) {
      setPhaseIndex((phaseIndex + 1) % phases.length)
      console.log('phase index', phaseIndex)
    }
  }, [time])
  useEffect(() => {
    console.log('running step on load')
    step();
  }, []);

  return (
    <div>TIMER: {time}</div>
  );
}