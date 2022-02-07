import { BackHandler, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { stylesEksternal } from '../../style/style';
import { DataRefreshAction } from '../../redux/Action';


export class ListDetailSoal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      soalDone:[],
      soalBelum:[],
      score:0
    }
  }

  componentWillUnmount(){
        
    BackHandler.removeEventListener('hardwareBackPress',()=>{
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'List Dosen' }],
          })
        return true});
        
}

componentDidMount(){
  this.getAllSoal()
    BackHandler.addEventListener('hardwareBackPress',()=>{
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'List Dosen' }],
          })
        return true});
    
  }

  
  getAllSoal(){
    axios.get(this.props.baseURL+'/soal/mahasiswa/dosen/'+this.props.route.params.idDosen,
    {
        headers: { Authorization: `Bearer ${this.props.token}` }
    })
    .then((response)=>{
        let data =response.data
        this.setState({
          soalDone:data.soalSudahDikerjakan,
          soalBelum:data.soalBelumDikerjakan,
          score:data.score
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}    

  render() {
    return (
      <View>
        <Text style={{fontWeight:"bold",color:"#FE5F55",marginTop:30,marginLeft:30,fontSize:15}}> SOAL YANG SUDAH DIKERJAKAN </Text>
        <Text style={{marginTop:5,marginLeft:30,fontSize:12}}> HASIL NILAI : {this.state.score} </Text>
          <FlatList
              data={this.state.soalDone}
              keyExtractor={item=>item.idHasil}
              renderItem={({item})=>(
                  <TouchableOpacity
                    onPress={()=>{
                      this.props.DataRefreshAction(item,"hasilLatihan")
                      this.props.navigation.navigate("Hasil Latihan Pribadi")}}
                  >
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
          <Text style={{fontWeight:"bold",color:"#FE5F55",marginTop:30,marginLeft:30,fontSize:15}}> SOAL YANG BELUM DIKERJAKAN </Text>
          <FlatList
              data={this.state.soalBelum}
              keyExtractor={item=>item.idSoal}
              renderItem={({item})=>(
                      <View style={stylesEksternal.listData}>
                          <View style={{flexDirection:"column"}}>
                              <Text style={{paddingLeft:20}}>Judul Soal : {item.judulSoal}</Text>  
                              <Text style={{paddingLeft:20}}>Tanggal Buat : {item.tanggalSoal}</Text> 
                          </View>
                      </View>
              )}
            />
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  baseURL:state.URLReducer.url,
  token:state.LoginReducer.token,
})

const mapDispatchToProps = {
  DataRefreshAction
}

export default connect(mapStateToProps, mapDispatchToProps) (ListDetailSoal);
