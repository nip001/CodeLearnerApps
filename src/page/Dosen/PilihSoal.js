import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import { stylesEksternal } from '../../style/style';
import { DataRefreshAction } from '../../redux/Action';

export class PilihSoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:[],
            // mahasiswa:{},
            hasilLatihan:{},
            score:0
        }
    }

    componentWillUnmount(){
        
        BackHandler.removeEventListener('hardwareBackPress',()=>{
            this.setState({
                dataSoal:[],
                score:0,
                hasilLatihan:{}
            })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'List Mahasiswa' }],
              })
            return true});
            
    }

    componentDidMount(){
        // this.setState({mahasiswa:this.props.route.params.mahasiswa
        // })
        this.getHasilLatihan()
        
        BackHandler.addEventListener('hardwareBackPress',()=>{
            this.setState({
                dataSoal:[],
                hasilLatihan:{},
                score:0
            })
            
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'List Mahasiswa' }],
              })
            return true});
        
    }


    getHasilLatihan(){
        axios.get(this.props.baseURL+'/hasillatihan/'+this.props.route.params.mahasiswa.idMahasiswa,
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            this.setState({hasilLatihan:data})
            let pengurangan = 100/data.length
            let nilai = 100 
            for (let index = 0; index < data.length; index++) {
                if(data[index].status === "ERROR"){
                    nilai -= pengurangan
                }
                this.setState({
                    dataSoal:[...this.state.dataSoal,data[index].idSoal]
                })
            }
            this.setState({
                score:nilai.toFixed(2)
            })
            // console.log(this.state.dataSoal)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                    <Text style={{marginTop:20,fontSize:30,alignSelf:'center'}}> {this.props.route.params.mahasiswa.namaMahasiswa} </Text>
                    <Text style={{color:"#9D9D9D",fontSize:20,alignSelf:'center'}}> ID : {this.props.route.params.mahasiswa.idMahasiswa} </Text>
                    
                    <Text style={{marginTop:20,marginLeft:30,fontSize:15}}> HASIL NILAI : {this.state.score} </Text>
                    <FlatList
                        data={this.state.hasilLatihan}
                        keyExtractor={item=>item.idHasil}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>{
                                this.props.DataRefreshAction(item,"hasilLatihan")
                                this.props.navigation.navigate("Hasil Latihan")
                                }}>
                                <View style={(item.status==="SUCCESS")?stylesEksternal.listData:stylesEksternal.listDataError}>
                                    <View style={{flexDirection:"column"}}>

                                        {/*nama mahasiswa*/}
                                        <Text style={(item.status==="SUCCESS")?{paddingLeft:20}:{paddingLeft:20,color:"white"}}>Task : {item.idSoal.judulSoal}</Text> 

                                        {/*Tanggal Hasil*/}
                                        <Text style={(item.status==="SUCCESS")?{paddingLeft:20}:{paddingLeft:20,color:"white"}}>Status : {item.status}</Text> 
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
    DataRefreshAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PilihSoal)
