import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
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
                             <View style={stylesEksternal.listData}>
                                <View style={{flexDirection:"column"}}>

                                    {/*nama dosen*/}
                                    <Text style={{paddingLeft:20}}>Nama Dosen : {item.idDosen.namaDosen}</Text> 

                                    {/*id dosen*/}
                                    <Text style={{paddingLeft:20}}>ID Dosen : {item.idDosen.idDosen}</Text> 
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
    token:state.LoginReducer.token,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDosen)
