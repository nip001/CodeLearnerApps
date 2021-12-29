import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import { stylesEksternal } from '../../style/style';

export class ListMahasiswa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataMahasiswa:{}
        }
    }

    componentDidMount(){
        this.getDaftarMahasiswa();
        BackHandler.addEventListener('hardwareBackPress',()=>{
            this.props.navigation.goBack()
            return true});
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', ()=>{
            this.props.navigation.goBack()
            return true});
    }

    getDaftarMahasiswa(){
        axios.get(this.props.baseURL+'/dosen/daftar/',
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({dataMahasiswa:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataMahasiswa}
                    keyExtractor={item=>item.idMahasiswa}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("Pilih Soal",{mahasiswa: item.idMahasiswa})                             
                        }}>
                             <View style={stylesEksternal.listData}>
                                 
                                <View style={{flexDirection:"row"}}>
                                    <Image style={{borderRadius: 50 / 2,overflow: "hidden",marginLeft:10, width:50,height:50, marginRight:20}}
                                        source={{uri:this.props.baseURL+'/user-photo/'+item.idMahasiswa.fotoMahasiswa}}
                                    />
                                    <View style={{flexDirection:"column",alignSelf:"center"}}>
                                        {/*nama mahasiswa*/}
                                        <Text>Nama : {item.idMahasiswa.namaMahasiswa}</Text> 

                                        {/*Tanggal Hasil*/}
                                        <Text>ID : {item.idMahasiswa.idMahasiswa}</Text> 
                                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMahasiswa)
