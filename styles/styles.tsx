
import {StyleSheet,} from 'react-native';
import {ButtonColor} from '../constants/colorStuff'

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    
    modalRow: {
        flexDirection: "row",
        paddingBottom: 5,
    },

    modalButton: {
        backgroundColor: ButtonColor,
        margin: 5,
        padding: 7,
    },

    modalTitle: {
        fontSize: 26,
        fontWeight: "900",
        paddingBottom: 10,
    },

    modalText: {
        fontSize: 17,
        paddingRight: 4,
    },

    modalInput: {
        fontSize: 17,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    }


    
  });
