import { StyleSheet } from "react-native";

export const stylesEksternal = StyleSheet.create({
    textStyle:{ 
        color: 'white'
    },
    button: {
        
        marginTop:30,
        backgroundColor:"#FE5F55",
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        
    },
    buttonError: {
        
        marginTop:30,
        backgroundColor:"#614E4E",
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        
    },
    listData: {
        flexDirection:"row",
        marginTop:30,
        borderWidth:5,
        borderColor:"#FE5F55",
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        borderRadius:50 ,
    },

    listDataError: {
      flexDirection:"row",
      marginTop:30,
      borderWidth:5,
      borderColor:"#302424",
      backgroundColor:"#614E4E",
      marginLeft: 30,
      marginRight: 30,
      padding: 10,
      borderRadius:50 ,
    },
  
    textStyleInput:{     
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        padding: 10,
    },
    input: {
      height: 40,
      marginLeft: 12,
      marginRight: 12,
      borderWidth: 1,
      padding: 10,
    },
    inputArea: {
      marginLeft: 12,
      marginRight: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  