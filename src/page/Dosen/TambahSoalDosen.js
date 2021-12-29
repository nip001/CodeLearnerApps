import React, { Component } from 'react'
import { View, Text, BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

export class TambahSoalDosen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            judul:"",
            deskripsi:"",
            output:"",
        }
    }

    componentDidMount(){
        
        BackHandler.addEventListener('hardwareBackPress',()=>{this.props.navigation.goBack()
            return true});
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', ()=>{this.props.navigation.goBack()
            return true});
    }

    submitHandler(){
        axios.post(this.props.baseURL+'/soal/',{
            judulSoal:this.state.judul,
            deskripsiSoal:this.state.deskripsi,
            jawaban:this.state.output
        },
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        },
        ).then((response)=>{
            alert(response.data.message);
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Soal Dosen' }],
              })
        }).catch((error)=>{})
    }

    render() {
        return (
            <View>
                <Text style={stylesEksternal.textStyleInput}>Judul Soal :</Text>
                <TextInput
                    style={stylesEksternal.input}
                    placeholder="masukan judul"
                    onChangeText={(value)=>{this.setState({judul:value})}}
                />
                <Text style={stylesEksternal.textStyleInput}>Penjelasan Soal :</Text>
                <TextInput
                    multiline
                    numberOfLines={10}
                    editable
                    style={stylesEksternal.inputArea}
                    placeholder="masukan output"
                    onChangeText={(value)=>{this.setState({deskripsi:value})}}
                />
                <Text style={stylesEksternal.textStyleInput}>Output yang diinginkan :</Text>
                <TextInput
                    style={stylesEksternal.input}
                    placeholder="masukan output"
                    onChangeText={(value)=>{this.setState({output:value})}}
                />
                
                <TouchableOpacity style={stylesEksternal.button}
                    onPress={()=>{this.submitHandler()}}
                >
                    <Text style={{color:"white",alignSelf:"center"}}>Submit</Text>
                </TouchableOpacity>
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


export default connect(mapStateToProps, mapDispatchToProps)(TambahSoalDosen)
