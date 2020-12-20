
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
        alignItems: 'center',
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

    modalTextPaddingRight: {
        fontSize: 17,
        paddingRight: 7,
        padding: 1,
    },

    modalInput: {
        fontSize: 17,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },

    modalText: {
      fontSize: 17,
      padding: 1,
    },

    modalInputTimer: {
      fontSize: 17,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      textAlign: 'center',
    },

    modalColumn: {
      flexDirection: 'column',
    },


    
  });
