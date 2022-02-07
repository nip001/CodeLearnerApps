import { BackHandler, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { stylesEksternal } from '../../style/style';

export class HasilLatihanPribadi extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            showNotif:false,
            textNotif:"",
            textColor:""
        }
    }

    componentDidMount(){
        
        BackHandler.addEventListener('hardwareBackPress',()=>{
            this.setState({showNotif:false,
                textNotif:"",
                textColor:""})
            this.props.navigation.goBack()
            return true});
    }

    componentWillUnmount(){
        
        BackHandler.removeEventListener('hardwareBackPress',()=>{
            this.setState({showNotif:false,
                textNotif:"",
                textColor:""})
            this.props.navigation.goBack()
            return true});
    }

    compilerHandler(){
        
        axios.post(this.props.baseURL+'/compile',{
            code:this.props.dataHasilLatihan.hasilCode
        },
        {
            headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then((response)=>{
            let data =response.data
            if(data.toString().includes("Error")){
                this.setState({showNotif:true,textNotif:data,textColor:"#F47174"})
            }else{
                this.setState({showNotif:true,textNotif:data,textColor:"#EEEE9B"})
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {

        return (
            <ScrollView>
                <View style={{ flexDirection:"column" }}>
                    <Text style={{alignSelf:'center',marginTop:30,fontSize:15}}>{this.props.dataHasilLatihan.idSoal.judulSoal}</Text>   
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>{this.props.dataHasilLatihan.idSoal.deskripsiSoal}</Text>
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>Output yang harus dipenuhi : {this.props.dataHasilLatihan.idSoal.jawaban}</Text>
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>Output Mahasiswa : {this.props.dataHasilLatihan.jawabanMahasiswa}</Text>
                    <Text style={{marginTop:10,marginLeft:20,marginRight:20}}>Status : {this.props.dataHasilLatihan.status}</Text>
                    
                    <View style={{marginTop:20}}>
                        <TextInput
                            multiline
                            editable
                            style={stylesEksternal.inputArea}
                            value={this.props.dataHasilLatihan.hasilCode}
                            editable={false}
                            selectTextOnFocus={false}
                        />  
                        
                        <View style={{flexDirection:"row",justifyContent:'flex-end'}}>
                            {
                                this.state.showNotif?(
                                    <View style={{width:250,backgroundColor:`${ this.state.textColor }`,marginTop:25}}>
                                        {
                                            this.state.textNotif!==""?
                                            <Text style={{marginTop:10,marginLeft:10,marginRight:10,marginBottom:10}}>Output : {this.state.textNotif}</Text>
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
    dataHasilLatihan:state.DataRefreshReducer.hasilLatihan
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HasilLatihanPribadi)

