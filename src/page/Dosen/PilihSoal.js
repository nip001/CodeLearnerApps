import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios';
import { stylesEksternal } from '../../style/style';

export class PilihSoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:[],
            mahasiswa:this.props.route.params.mahasiswa,
            hasilLatihan:{}
        }
    }

    componentDidMount(){
        this.getHasilLatihan()
    }

    getHasilLatihan(){
        axios.get(this.props.baseURL+'/hasillatihan/'+this.state.mahasiswa.idMahasiswa,
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({hasilLatihan:data})
            for (let index = 0; index < data.length; index++) {
                this.setState({
                    dataSoal:[...this.state.dataSoal,data[index].idSoal]
                })
            }
            // console.log(this.state.dataSoal)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                    <Text style={{marginTop:20,fontSize:30,alignSelf:'center'}}> {this.state.mahasiswa.namaMahasiswa} </Text>
                    <Text style={{color:"#9D9D9D",fontSize:20,alignSelf:'center'}}> ID : {this.state.mahasiswa.idMahasiswa} </Text>
                    
                    <FlatList
                        data={this.state.hasilLatihan}
                        keyExtractor={item=>item.idHasil}
                        renderItem={({item})=>(
                             <View style={(item.status==="SUCCESS")?stylesEksternal.listData:stylesEksternal.listDataError}>
                                <View style={{flexDirection:"column"}}>

                                    {/*nama mahasiswa*/}
                                    <Text style={(item.status==="SUCCESS")?{paddingLeft:20}:{paddingLeft:20,color:"white"}}>Task : {item.idSoal.judulSoal}</Text> 

                                    {/*Tanggal Hasil*/}
                                    <Text style={(item.status==="SUCCESS")?{paddingLeft:20}:{paddingLeft:20,color:"white"}}>Status : {item.status}</Text> 
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

export default connect(mapStateToProps, mapDispatchToProps)(PilihSoal)
