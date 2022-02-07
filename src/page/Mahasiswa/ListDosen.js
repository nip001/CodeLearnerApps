import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { stylesEksternal } from '../../style/style'

export class ListDosen extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            dataDaftar:[]
        }
    }


    componentDidMount(){
        this.getDaftarDosen()
    }

    getDaftarDosen(){
        axios.get(this.props.baseURL+'/dosen/daftar/mahasiswa/',
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({dataDaftar:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }    

    render() {
        return (
            <View>
                <TouchableOpacity style={stylesEksternal.button}
                                    onPress={()=>{this.props.navigation.navigate("Tambah Dosen")}}
                                >
                                    <Text style={{color:"white",alignSelf:"center"}}>Tambah Dosen!</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.dataDaftar}
                    keyExtractor={item=>item.idDaftar}
                    renderItem={({item})=>(
                             <TouchableOpacity style={stylesEksternal.listData}
                             onPress={()=>{this.props.navigation.navigate("List Detail Soal",{idDosen:item.idDosen.idDosen})}}>
                             <Image style={{borderRadius: 50 / 2,overflow: "hidden",marginLeft:10, width:50,height:50, marginRight:20}}
                                     source={{uri:this.props.baseURL+'/user-photo/'+item.idDosen.fotoDosen}}
                                 />
                                <View style={{flexDirection:"column"}}>

                                    {/*nama dosen*/}
                                    <Text style={{paddingLeft:20}}>Nama Dosen : {item.idDosen.namaDosen}</Text> 

                                    {/*id dosen*/}
                                    <Text style={{paddingLeft:20}}>NIDN : {item.idDosen.idDosen}</Text> 
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
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDosen)
