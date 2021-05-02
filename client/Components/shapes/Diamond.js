import React, {useState} from 'react';
import { TouchableOpacity } from "react-native";
import {Modal} from '../index';

const Diamond = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={{
      width: props.size.width, 
      height: props.size.height,
      left: props.left,
      top: props.top,
      backgroundColor: "#555555",
      position: 'absolute', 
      transform: [{ translateX: -props.size.width/2}, {translateY: -props.size.height/2}]
      }}
      onPress={() => setModalVisible(true)}
      />
      {
        modalVisible ? 
          <Modal 
            value={`Ankerpunt:\n${props.anchor.UUID}\n\nPositie:\n(x, y) => (${props.anchor.coordinate_X}, ${props.anchor.coordinate_Y})`}
            visible={modalVisible}
            setModalVisible={setModalVisible}
          /> : <></>
      }
    </>
  );

};
export default Diamond;