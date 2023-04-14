import React, { useEffect, useState } from "react";

const formatTime = (time: number) => time.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false
})

const useTimer = (running: boolean) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timer: any;
    
    if(running) {
      timer = setInterval(() => {
        setTime(prev => prev + 1)

      }, 1000)
    } else {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, []);

  return {
    hours: formatTime(Math.floor(time / 3600)),
    minutes: formatTime(Math.floor((time % 3600) /60)),
    seconds: formatTime((time % 3600) % 60)
  };
}
 
export default useTimer;