import React from 'react';
import {useState, useEffect} from 'react';

const TIMER_DURATION = 6

export default function Timer() {
  const [time, setTime] = useState()

  function step() {
    const timestamp = Date.now() / 1000;
    const timeLeft = (TIMER_DURATION - 1) - Math.round(timestamp) % TIMER_DURATION;
    setTime(timeLeft);
    const timeCorrection = Math.round(timestamp) - timestamp;
    setTimeout(step, timeCorrection * 1000 + 1000);
  }

  useEffect(() => {
    step();
  }, []);

  return (
    <div>{time}</div>
  );
}