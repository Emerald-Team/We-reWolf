import React from 'react';
import {useState, useEffect} from 'react';

// const TIMER_DURATION = 6

export default function Timer({period, callback}) {
  const [time, setTime] = useState(period)

  function step() {
    const timestamp = Date.now() / 1000;
    const timeLeft = (period - 1) - Math.round(timestamp) % period;
    setTime(timeLeft);
    const timeCorrection = Math.round(timestamp) - timestamp;
    setTimeout(step, timeCorrection * 1000 + 1000);
  }

  useEffect(() => {
    if (time < 1) {
      callback();
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