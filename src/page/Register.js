import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { connect } from 'react-redux';

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:"",
            name:"",
            password:"",
            image:"https://asset.kompas.com/crops/7aeyQXv6hi9593Gh1ppQgPeSMkg=/0x8:1747x1172/750x500/data/photo/2020/11/26/5fbf40c4507ae.jpg",
            kelas:"",
        }
    }

    componentDidMount(){
        this.getPermission()
    }
    
    async getPermission(){
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    async pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
          
          if (!result.cancelled) {
              console.log(result.uri)
              this.setState({image:result.uri})
          }
    }
    

    handlerSubmit(){
        
        let formData = new FormData();
        let filename = this.state.image;
        console.log("nama gambar "+ filename.split('/').pop())
        formData.append('file',{
            uri: this.state.image, //Your Image File Path
            type: 'image/jpeg', 
            name: filename.split('/').pop(),
         })

         if(this.props.route.params === "dosen"){         
            formData.append('data',JSON.stringify({
                namaDosen:this.state.name,
                password:this.state.password,
                username:this.state.username
            }))
           
            axios.post(this.props.baseURL+'/data/dosen/register',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                alert("Berhasil tambahkan data")
                
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Code Learner' }],
                  })
            })
            .catch((error)=>{
                console.log(error)
            })
         }else{
            formData.append('data',JSON.stringify({
                namaMahasiswa:this.state.name,
                password:this.state.password,
                username:this.state.username,
                kelas:this.state.kelas
            }))
           
            axios.post(this.props.baseURL+'/data/mahasiswa/register',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                alert("Berhasil tambahkan data")
                
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Code Learner' }],
                  })
            })
            .catch((error)=>{
                console.log(error)
            })
         }
    }

  render() {
    return (
      <ScrollView>
             <Text style={styles.textStyle}>Nama {this.props.route.params} : </Text>
            <TextInput
                style={styles.input}
                placeholder="masukan nama"
                onChangeText={(value)=>{this.setState({name:value})}}
            />

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

            {this.props.route.params !== "dosen" ?(
                <View>
                    <Text style={styles.textStyle}>Kelas : </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="masukan kelas"
                        onChangeText={(value)=>{this.setState({kelas:value})}}
                    />
                </View>
            ):null}
            <TouchableOpacity style={styles.button}
                onPress={()=>{this.pickImage()}}
            >
                <Text style={{color:"white",alignSelf:"center"}}>Pilih Foto</Text>
            </TouchableOpacity>
                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200,alignSelf:'center' }} />
                
            <TouchableOpacity style={styles.button}
                onPress={()=>{this.handlerSubmit()}}
            >
                <Text style={{color:"white",alignSelf:"center"}}>Daftar</Text>
            </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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
  