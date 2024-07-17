import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';


const CurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('MMMM DD, YYYY');

return (
    <View >
    <Text className="text-2xl font-bold">{formattedDate}</Text>
    </View>
  );
};

export default CurrentDate;
