import React, { Component } from 'react'
import { View, Text, BackHandler, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

export class SoalDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:{},
            kelas:"",
        }
    }

    componentDidMount(){
        this.getSoal();
        BackHandler.addEventListener('hardwareBackPress',()=>{this.props.navigation.goBack()
            return true});
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', ()=>{this.props.navigation.goBack()
            return true});
    }
    getSoal(){
        axios.get(this.props.baseURL+'/soal/',
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({dataSoal:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    
    cariHandler(){
        if(this.state.kelas !== ""){
            axios.get(this.props.baseURL+'/soal/kelas/'+this.state.kelas,
            {
                headers: { Authorization: `Bearer ${this.props.token}` }
            })
            .then((response)=>{
                let data =response.data
                this.setState({dataSoal:data})
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            axios.get(this.props.baseURL+'/soal/',
            {
                headers: { Authorization: `Bearer ${this.props.token}` }
            })
            .then((response)=>{
                let data =response.data
                this.setState({dataSoal:data})
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection:"row" }}>
                    <TextInput 
                        style={{ width: "75%", borderWidth:2, marginTop:30,marginLeft:20,borderColor:"#BEBEBE",paddingLeft:20,paddingRight:20 }}
                        placeholder="Cari Kelas"
                        onChangeText={(value)=>{this.setState({kelas:value})}}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{this.cariHandler()}}>
                        <Text style={{color:"white",alignSelf:"center"}}>Cari</Text>
                    </TouchableOpacity>
                   
                </View>
                <TouchableOpacity style={stylesEksternal.button}
                            onPress={() => {this.props.navigation.navigate("Tambah Soal Dosen")}}
                >
                    <Text style={{color:"white",alignSelf:"center"}}>Tambahkan Soal</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.dataSoal}
                    keyExtractor={item=>item.idSoal}
                    renderItem={({item})=>(
                             <View style={stylesEksternal.listData}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{flexDirection:"column",width:230}}>

                                        {/*nama mahasiswa*/}
                                        <Text style={{paddingLeft:20}}>Judul Soal : {item.judulSoal}</Text> 

                                        {/*Tanggal Hasil*/}
                                        <Text style={{paddingLeft:20}}>Tanggal Buat : {item.tanggalSoal}</Text> 
                                    </View>
                                    
                                    <View style={{flexDirection:"column"}}>

                                        {/*nama mahasiswa*/}
                                        <Text style={{fontSize:10,textAlign:'center',color:"#FE5F55",fontWeight:"bold" }} >KELAS</Text> 

                                        {/*Tanggal Hasil*/}
                                        <Text style={{fontSize:20,textAlign:'center',color:"#FE5F55",fontWeight:"bold" }}>{item.kelas}</Text> 
                                    </View>
                                </View>
                             </View>
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url,
    token:state.LoginReducer.token
})

const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(SoalDosen)


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