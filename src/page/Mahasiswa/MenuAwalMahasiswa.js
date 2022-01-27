import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react'
import { View, Text, Image, BackHandler, Alert } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { DataRefreshAction } from '../../redux/Action';
import { stylesEksternal } from '../../style/style';

export class MenuAwalDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHasilLatihan:{},
            isDataFound:false
        }
    }

    componentDidMount(){
        this.getHasilLatihan();
    }

    

    getHasilLatihan(){
        axios.get(this.props.baseURL+'/hasillatihan/mahasiswa/',
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            if(!_.isEmpty(data)){
                this.props.DataRefreshAction(data,"hasillatihan")
                this.setState({
                    dataHasilLatihan:data,
                    isDataFound:true
                })    
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
   
    render() {
        return (
            <View>
                {this.state.isDataFound ?(
                    <FlatList
                        data={this.state.dataHasilLatihan}
                        keyExtractor={item=>item.idHasil}
                        renderItem={({item})=>(
                            <TouchableOpacity style={(item.status==="SUCCESS")?stylesEksternal.button:stylesEksternal.buttonError} onPress={()=>{}}>
                                <View style={{flexDirection:"row"}}>
                                    <Image style={{width:100,height:100, marginRight:30}}
                                        source={{uri:this.props.baseURL+'/user-photo/'+item.idMahasiswa.fotoMahasiswa}}
                                    />
                                    <View style={{flexDirection:"column"}}>

                                        {/*nama mahasiswa*/}
                                        <Text style={stylesEksternal.textStyle}>{item.idMahasiswa.namaMahasiswa}</Text> 
                                        <Text style={stylesEksternal.textStyle}>Already Submit Task : </Text> 
                                        
                                        {/*judul Soal*/}
                                        <Text style={stylesEksternal.textStyle}>{item.idSoal.judulSoal}</Text> 

                                        {/*Tanggal Hasil*/}
                                        <Text style={{color:"white",textAlign:"right"}}>{item.tanggalSubmit}</Text> 
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ):(
                    <Text style={{alignSelf:'center',marginTop:30,fontSize:15}}>------ No Data Found ------</Text>   
                )}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    baseURL:state.URLReducer.url,
    token:state.LoginReducer.token
})

const mapDispatchToProps = {
    DataRefreshAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAwalDosen)

