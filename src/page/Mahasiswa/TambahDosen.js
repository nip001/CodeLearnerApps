import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style'
import axios from 'axios'

export class TambahDosen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idDosen:"",
            dataDosen:{},
            dosenExist:false,
        }
    }

    componentDidMount(){
    }

    cariHandler(){
        
        axios.get(this.props.baseURL+'/dosen/mahasiswa/'+this.state.idDosen,
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({dataDosen:data,dosenExist:true})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    tambahDosen(idDosen){
        
        axios.post(this.props.baseURL+'/dosen/daftar/',{
            idDosen:{
                    idDosen:idDosen
            }
        },
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            console.log(data)
            
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'List Dosen' }],
              })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection:"row" }}>
                    <TextInput 
                        style={{ width: "75%", borderWidth:2, marginTop:30,marginLeft:20,borderColor:"#BEBEBE",paddingLeft:20,paddingRight:20 }}
                        placeholder="Masukan Nama Dosen atau NIDN Dosen"
                        onChangeText={(value)=>{this.setState({idDosen:value})}}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{this.cariHandler()}}>
                        <Text style={{color:"white",alignSelf:"center"}}>Cari</Text>
                    </TouchableOpacity>
                   
                </View>
                {this.state.dosenExist ?(
                    <FlatList
                        data={this.state.dataDosen}
                        keyExtractor={item=>item.idDosen}
                        renderItem={({item})=>(
                            <View style={{flexDirection:"row",margin:20,borderWidth:2,borderColor:"#FE5F55"}}>
                                <Image style={{borderRadius: 100 / 2,overflow: "hidden",margin:10, width:80,height:80}}
                                    source={{uri:this.props.baseURL+'/user-photo/'+item.fotoDosen}}
                                />
                                <View style={{flexDirection:"column",alignSelf:"center",width:120}}>

                                    {/*nama mahasiswa*/}
                                    <Text style={{ color:"#FE5F55",fontWeight:"bold" }}>Nama: {item.namaDosen}</Text>                                     
                                    <Text style={{ color:"#FE5F55",fontWeight:"bold" }}>NIDN: {item.idDosen}</Text> 
                                </View>
                                
                                    <TouchableOpacity style={styles.button2} onPress={()=>{this.tambahDosen(item.idDosen)}}>
                                        <Text style={{color:"white",fontSize:12}}>Tambah Dosen</Text>
                                    </TouchableOpacity>
                            </View>
                        )}
                    />
                ):(
                    <Text style={{alignSelf:'center',marginTop:30,fontSize:15}}>------ No Data Found ------</Text>   
                )}
            </View>
            // <View>
            //     <View style={{ flexDirection:"row" }}>
            //         <TextInput 
            //             style={{ width: "75%", borderWidth:2, marginTop:30,marginLeft:20,borderColor:"#BEBEBE",paddingLeft:20,paddingRight:20 }}
            //             placeholder="Masukan ID Dosen"
            //             onChangeText={(value)=>{this.setState({idDosen:value})}}
            //         />
            //         <TouchableOpacity style={styles.button} onPress={()=>{this.cariHandler()}}>
            //             <Text style={{color:"white",alignSelf:"center"}}>Cari</Text>
            //         </TouchableOpacity>
                   
            //     </View>
            //     {
            //             this.state.dosenExist?
            //             <>
            //                     <Text style={{marginTop:20,fontSize:30,alignSelf:'center'}}> {this.state.dataDosen.namaDosen} </Text>
            //                     <Text style={{color:"#9D9D9D",fontSize:20,alignSelf:'center'}}> ID : {this.state.dataDosen.idDosen} </Text>
                  
            //                     <Image style={{alignSelf:"center",marginTop:30,width:200,height:200}}
            //                             source={{uri:this.props.baseURL+'/user-photo/'+this.state.dataDosen.fotoDosen}}
            //                         />

                                // <TouchableOpacity style={styles.button2} onPress={()=>{this.tambahDosen()}}>
                                //     <Text style={{color:"white",alignSelf:"center"}}>Tambah Dosen</Text>
                                // </TouchableOpacity>
            //             </>:null
            //     }
            // </View>
        )
    }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url,
    token:state.LoginReducer.token,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TambahDosen)


const styles = StyleSheet.create({
    button:{
        
        marginTop:30,
        backgroundColor:"#FE5F55",
        marginLeft: 10,
        marginRight: 30,
        padding: 10,
    },
    button2:{
        width:65,
        marginLeft:50,
        backgroundColor:"#FE5F55",
        alignSelf:"center",
        padding: 10,
    }
})