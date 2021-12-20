import React, { Component } from 'react'
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

class MenuAwal extends Component {
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
