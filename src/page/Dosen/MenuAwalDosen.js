import axios from 'axios';
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style';

export class MenuAwalDosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHasilLatihan:{}
        }
    }

    componentDidMount(){
        this.getHasilLatihan();
    }

    getHasilLatihan(){
        axios.get(this.props.baseURL+'/hasillatihan/',
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({dataHasilLatihan:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }
   
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataHasilLatihan}
                    keyExtractor={item=>item.idHasil}
                    renderItem={({item})=>(
                        <TouchableOpacity style={stylesEksternal.button} onPress={()=>{}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuAwalDosen)

