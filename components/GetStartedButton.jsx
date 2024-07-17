import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const GetStartedButton = ({
    title,
    handlePress
}) => {
  return (
    <TouchableOpacity onPress={handlePress} 
    className="bg-orange-400 rounded-xl flex justify-center items-center p-4">
      <Text className="font-semibold text-2xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default GetStartedButton;
