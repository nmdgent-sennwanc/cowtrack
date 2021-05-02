import React from 'react';
import { TouchableOpacity, View, Modal, Text, StyleSheet } from "react-native";

const ModalComp = (props) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            alert("Modal has been closed.");
            props.setModalVisible(false);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.value}</Text>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => props.setModalVisible(false)}>
                <Text style={styles.textStyle}>Sluit</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>  
    );

};

let colors = {
  'dark-brown': '#806854',
  'brown': '#B39C7D',
  'light-brown': '#F0EBD8',
  'white': '#FDFFF5',
  'black': '#000000',
  'grey': '#E8E8E8',
  'dark-grey': '#555555'
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: colors['light-brown'],
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors['dark-grey'],
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: colors['brown'],
    width: 100
  },
  textStyle: {
    color: colors['light-brown'],
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors['dark-brown']
  }
});

export default ModalComp;