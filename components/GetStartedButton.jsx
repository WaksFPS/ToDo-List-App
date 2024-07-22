import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const GetStartedButton = ({
    title,
    handlePress
}) => {
  return (
    <TouchableOpacity onPress={handlePress} 
    className=" bg-amber-500 rounded-xl items-bottom px-9 py-3 mt-5">
      <Text className="font-semibold text-xl text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default GetStartedButton;
