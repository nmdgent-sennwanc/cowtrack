import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Circle = (props) => {
  const navigation = useNavigation();
  const [circleColor, setCircleColor] = useState();

  const handleOnpress = async() =>{
    navigation.navigate('Foundcow', {cow: props.cow});
  };

  useEffect(() => {
    
    switch (props.state) {
      case 'Gemolken':
        setCircleColor('#A8BAA9');
        break;

      case 'Op te halen':
        setCircleColor('#B46E66');
        break;

      case 'Zelfde plaats':
        setCircleColor('#E9B873');
        break;

      case 'Gevonden':
        setCircleColor('#806854');
        break;

      default:
        setCircleColor('#555555');
        break;
    }
  }, []);

  return (
      <TouchableOpacity style={{
        width: props.size.width, 
        height: props.size.height,
        left: props.left,
        top: props.top,
        backgroundColor: circleColor, 

        borderRadius: 100/2,
        position: 'absolute', 
        transform: [{ translateX: -props.size.width/2}, {translateY: -props.size.height/2}]
        }} 

        onPress={() => {handleOnpress();}}
        />
  );

}

export default Circle