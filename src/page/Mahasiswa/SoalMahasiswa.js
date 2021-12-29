import React, { Component } from 'react'
import { View, Text, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

export class SoalDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:{},
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

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSoal}
                    keyExtractor={item=>item.idSoal}
                    renderItem={({item})=>(
                             <View style={stylesEksternal.listData}>
                                <View style={{flexDirection:"column"}}>

                                    {/*nama mahasiswa*/}
                                    <Text style={{paddingLeft:20}}>Judul Soal : {item.judulSoal}</Text> 

                                    {/*Tanggal Hasil*/}
                                    <Text style={{paddingLeft:20}}>Tanggal Buat : {item.tanggalSoal}</Text> 
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
