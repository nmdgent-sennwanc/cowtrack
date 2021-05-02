import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from "react-native";

const Rectangle = (props) => {
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  const [dimensions, setDimensions] = useState({ window, screen });
  const [scaledHeight, setScaledHeight] = useState();
  const [scaledWidth, setScaledWidth] = useState();

    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    };

    useEffect(() => {
      Dimensions.addEventListener("change", onChange);
      return () => {
        Dimensions.removeEventListener("change", onChange);
      };
    });

    useEffect(() => {
      if(props.scale && props.floor){
        let heightFactor = null;
        props.scale > 1.20 ? heightFactor = 0.65 : heightFactor = 0.40;

        const newWidth = (dimensions.screen.height*heightFactor)/props.scale;

        setScaledWidth(newWidth);
        setScaledHeight(dimensions.screen.height*heightFactor);
      }  
    }, []);

    return (
      <>
        <View style={{position: 'relative', alignItems: 'center'}}>
            { scaledHeight &&
              <View style={{
                width: scaledWidth, 
                height:scaledHeight, 
                backgroundColor: "#E8E8E8", 
                overflow:'hidden',
                borderWidth: 4, 
                borderColor: '#F0EBD8'
              }}>
                {
                  props.children
                }
              </View>
            }
        </View>
      </>
    );

}
export default Rectangle