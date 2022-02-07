import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';
import { LoginAction } from '../redux/Action'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:"",
        }
    }

    loginHandler(){
        axios.post(this.props.baseURL+'/authenticate',{
            username:this.state.username,
            password:this.state.password
        },{
            params:{
                role:this.props.route.params
            }
        
        })
        .then((response)=>{
            let data=response.data;
            if(data !== ""){
                this.props.LoginAction(this.state.username,"username")
                this.props.LoginAction(data.jwttoken,"token")
                this.props.LoginAction(data.namaUser,"nama")
                this.props.LoginAction(data.idUser,"iduser")
                this.props.LoginAction(data.fotoUser,"fotouser")
                this.props.LoginAction(this.props.route.params,"role")
                console.log(data.jwttoken)
                if(this.props.route.params == "dosen"){
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu Awal Dosen' }],
                      })
                }else{
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Menu Awal Mahasiswa' }],
                      })
                }
            }else{
                Alert.alert("login gagal")
            }
        }).catch((error)=>{
            if (error.response) {
                if(error.response.status == 401){
                    Alert.alert("User Unauthorized")
                }else if(error.response.status == 500){

                    Alert.alert("User Not Found")
                }
            //   console.log(error.response.data.error);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
            }
        })
    }

    render() {
        return (
            <View>
                
                <Text style={styles.textStyle}>Username {this.props.route.params} :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="masukan username"
                    onChangeText={(value)=>{this.setState({username:value})}}
                />
                    
                <Text style={styles.textStyle}>Password :</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="masukan password"
                    onChangeText={(value)=>{this.setState({password:value})}}
                />
                
                <TouchableOpacity style={styles.button}
                    onPress={()=>{this.loginHandler()}}
                >
                    <Text style={{color:"white",alignSelf:"center"}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop:20,flexDirection:"row-reverse",margin:10 }} onPress={()=>{this.props.navigation.navigate("Register",this.props.route.params)}}>
                    <Text >Daftar Akun</Text>
                </TouchableOpacity>
                {/* <Text> {this.props.route.params} </Text> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    textStyle:{     
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
    button: {
        
        height: 40,
        marginTop:30,
        backgroundColor:"#FE5F55",
        marginLeft: 12,
        marginRight: 12,
        padding: 10,
    },
  });
  