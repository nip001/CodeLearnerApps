import React, { Component } from 'react'
import { View, Text, BackHandler } from 'react-native'
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
            let index= 1;
            this.setState({dataSoal:data})
            // console.log("=====================data========================")
            // console.log(data)
            this.props.hasillatihan.forEach(element => {
                // console.log(this.state.dataSoal)
                data.splice(element.idSoal.idSoal-index,1)
                // this.setState({dataSoal:[...this.state.dataSoal.splice(element.idSoal.idSoal,1)]})
                // if(index===0){
                //     index++;
                // }
                // console.log(element.idSoal.idSoal-index)
                index++;
            });
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
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Isi Soal",item)}}>
                             <View style={stylesEksternal.listData}>
                                <View style={{flexDirection:"column"}}>

                                    {/*nama mahasiswa*/}
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
