import axios from 'axios';
import React, { Component } from 'react'
import { View, Text, BackHandler, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { stylesEksternal } from '../../style/style';

export class IsiSoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSoal:this.props.route.params,
            showNotif:false,
            dataCode:"",
            textNotif:"",
            textColor:""
        }
    }

    componentDidMount(){
        
        BackHandler.addEventListener('hardwareBackPress',()=>{
            
            this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Soal Mahasiswa' }],
                      })
            // this.setState({
            //     dataSoal:{},
            //     showNotif:false,
            //     dataCode:"",
            //     textNotif:"",
            //     textColor:""})
            // this.props.navigation.goBack()
            return true});
    }


    componentWillUnmount(){
        
        BackHandler.removeEventListener('hardwareBackPress',()=>{
            this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Soal Mahasiswa' }],
                      })
            // this.setState({
            //     dataSoal:{},
            //     showNotif:false,
            //     dataCode:"",
            //     textNotif:"",
            //     textColor:""})
            // this.props.navigation.goBack()
            return true});
    }

    compilerHandler(){
        
        axios.post(this.props.baseURL+'/compile',{
            code:this.state.dataCode
        },
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            if(data.toString().includes(this.state.dataSoal.jawaban)){
                    this.setState({showNotif:true,textNotif:data,textColor:"#D6E5FA"})
            }else{
                console.log(data)
                if(data.toString().includes("Error")){
                    this.setState({showNotif:true,textNotif:data,textColor:"#F47174"})
                }else{
                    this.setState({showNotif:true,textNotif:data,textColor:"#EEEE9B"})
                }
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    hasilLatihanHandler(){
        
        axios.post(this.props.baseURL+'/hasillatihan/',{
            idSoal:{
                idSoal:this.state.dataSoal.idSoal
            },
            jawabanMahasiswa:this.state.textNotif.substring(0,this.state.textNotif.length-1),
            hasilCode:this.state.dataCode
        },
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            alert(data)
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Menu Awal Mahasiswa' }],
              })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {

        return (
            <ScrollView>
                {/* <Text style={{marginTop:20,fontSize:30,alignSelf:'center'}}> {this.props.dataHasilLatihan.idMahasiswa.namaMahasiswa} </Text>
                <Text style={{color:"#9D9D9D",fontSize:20,alignSelf:'center'}}> ID : {this.props.dataHasilLatihan.idMahasiswa.idMahasiswa} </Text>
                 */}
                <View style={{ flexDirection:"column" }}>
                    <Text style={{alignSelf:'center',marginTop:30,fontSize:15}}>{this.state.dataSoal.judulSoal}</Text>   
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>{this.state.dataSoal.deskripsiSoal}</Text>
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>Output yang harus dipenuhi : {this.state.dataSoal.jawaban}</Text>
                    
                    <View style={{marginTop:20}}>
                        <TextInput
                            multiline
                            editable
                            onChangeText={(value)=>{
                                this.setState({
                                    dataCode:value,
                                })
                            }}
                            style={stylesEksternal.inputArea}
                        />  
                        
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}>
                            {
                                this.state.showNotif?(
                                    <View style={{width:250,backgroundColor:`${ this.state.textColor }`,marginTop:25}}>
                                        {
                                            this.state.textNotif!==""?
                                            <> 
                                                {
                                                    this.state.textColor==="#EEEE9B"?
                                                    <Text style={ {color:"red",marginTop:10,marginLeft:10,marginRight:10}}>Peringatan ! Output tidak sesuai!"</Text>
                                                    :null
                                                }
                                                <Text style={{marginTop:10,marginLeft:10,marginRight:10,marginBottom:5}}>Output : {this.state.textNotif}</Text>
                                            </>
                                            :null
                                        }
                                    </View>
                                ) : null
                            }

                            <TouchableOpacity style={stylesEksternal.button}
                                onPress={()=>{this.compilerHandler()}}
                            >
                                <Text style={{color:"white",alignSelf:"center"}}>Run</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.textNotif!==""?
                            
                                <TouchableOpacity style={stylesEksternal.button}
                                    onPress={()=>{this.hasilLatihanHandler()}}
                                >
                                    <Text style={{color:"white",alignSelf:"center"}}>Submit</Text>
                                </TouchableOpacity>
                            :null
                        }
                    </View>
                    {/* <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>{this.props.dataHasilLatihan.hasilCode}</Text>       */}
                    
                </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => ({
    
    baseURL:state.URLReducer.url,
    token:state.LoginReducer.token,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(IsiSoal)
