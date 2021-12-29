import React, { Component } from 'react'
import { Alert, BackHandler, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

class MenuAwal extends Component {
    onBackPress = () => {
 
        //Code to display alert message when use click on android device back button.
        Alert.alert(
          ' Exit From App ',
          ' Do you want to exit From App ?',
          [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => console.log('NO Pressed') }
          ],
          { cancelable: false },
        );
     
        // Return true to enable back button over ride.
        return true;
      }

    componentDidMount(){
        
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    render() {
        return (
            <View>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle}> Code Learner </Text>
                </View>

                <View style={styles.buttonStyle}>
                    <Button
                            title="Dosen"
                            color="#FE5F55"
                            onPress={() => {this.props.navigation.navigate("Login","dosen")}}
                        />
                </View>
                <View style={styles.buttonStyle}>
                    <Button
                        title="Mahasiswa"
                        color="#FE5F55"
                        onPress={() => {this.props.navigation.navigate("Login","mahasiswa")}}
                    />
                </View>
              
            </View>
            
        )
    }
}


export default MenuAwal

styles = StyleSheet.create({

    buttonStyle:{
        margin:20,
    },

    titleStyle:{
        textAlign: 'center',
        padding:20,
        fontSize:30
    },

    titleView:{
        alignSelf:"center",
        padding:20,
        flexDirection:"row"
    }

})
