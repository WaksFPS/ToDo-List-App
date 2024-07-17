import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm A'));

  useEffect(() => {
    const tick = () => setCurrentTime(moment().format('h:mm A'));
    const interval = setInterval(tick, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{currentTime}</Text>
    </>
  );
};

export default CurrentTime;
