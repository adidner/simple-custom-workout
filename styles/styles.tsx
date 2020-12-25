
import {StyleSheet,} from 'react-native';
import {ButtonColor} from '../constants/colorStuff';

const titleFontSize: number = 26;
const normalFontSize: number = 18;

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
        fontSize: titleFontSize,
        fontWeight: "900",
        paddingBottom: 10,
    },

    modalTextPaddingRight: {
        fontSize: normalFontSize,
        paddingRight: 7,
        padding: 1,
    },

    modalInput: {
        fontSize: normalFontSize,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },

    modalText: {
      fontSize: normalFontSize,
      padding: 1,
    },

    modalTextRest: {
      fontSize: normalFontSize,
      padding: 1,
      paddingRight: 5,
    },

    modalInputTimer: {
      fontSize: normalFontSize,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      textAlign: 'center'
    },

    modalColumn: {
      flexDirection: 'column',
    },


    
  });
