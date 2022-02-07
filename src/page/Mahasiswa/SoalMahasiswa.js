import React, { Component } from 'react'
import { View, Text, BackHandler, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import _ from 'lodash'

export class SoalDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:[],
            namaDosen:"",
        }
    }

    componentDidMount(){
        this.setState({dataSoal:[]})
        this.getSoal();
        BackHandler.addEventListener('hardwareBackPress',()=>{this.props.navigation.goBack()
            return true});
    }

    componentWillUnmount(){
        this.setState({dataSoal:[]})
        BackHandler.removeEventListener('hardwareBackPress', ()=>{this.props.navigation.goBack()
            return true});
    }
    getSoal(){
        axios.get(this.props.baseURL+'/soal/mahasiswa/',
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
        if(this.state.namaDosen !== ""){
            axios.get(this.props.baseURL+'/soal/namadosen/'+this.state.namaDosen,
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
            axios.get(this.props.baseURL+'/soal/mahasiswa/',
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
                        placeholder="Cari berdasarkan nama dosen"
                        onChangeText={(value)=>{this.setState({namaDosen:value})}}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{this.cariHandler()}}>
                        <Text style={{color:"white",alignSelf:"center"}}>Cari</Text>
                    </TouchableOpacity>
                   
                </View>
                <FlatList
                    data={this.state.dataSoal}
                    keyExtractor={item=>item.idSoal}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Isi Soal",item)}}>
                             <View style={stylesEksternal.listData}>
                                <View style={{flexDirection:"column"}}>

                                    {/*nama mahasiswa*/}
                                    <Text style={{paddingLeft:20}}>Nama Dosen : {item.idDosen.namaDosen}</Text>
                                    <Text style={{paddingLeft:20}}>Judul Soal : {item.judulSoal}</Text> 

                                    {/*Tanggal Hasil*/}
                                    <Text style={{paddingLeft:20}}>Tanggal Buat : {item.tanggalSoal}</Text> 
                                </View>
                             </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url,
    token:state.LoginReducer.token,
    hasillatihan:state.DataRefreshReducer.hasillatihan
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