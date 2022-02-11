import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Logout from '../page/Logout';
import MenuAwalDosen from '../page/Dosen/MenuAwalDosen';
import SoalDosen from '../page/Dosen/SoalDosen';
import Router from './Router';
import TambahSoalDosen from '../page/Dosen/TambahSoalDosen';
import ListMahasiswa from '../page/Dosen/ListMahasiswa';
import PilihSoal from '../page/Dosen/PilihSoal';
import HasilLatihan from '../page/Dosen/HasilLatihan';
import MenuAwalMahasiswa from '../page/Mahasiswa/MenuAwalMahasiswa';
import { Image, Text, View } from 'react-native';
import SoalMahasiswa from '../page/Mahasiswa/SoalMahasiswa';
import IsiSoal from '../page/Mahasiswa/IsiSoal';
import ListDosen from '../page/Mahasiswa/ListDosen';
import TambahDosen from '../page/Mahasiswa/TambahDosen';
import ListDetailSoal from '../page/Mahasiswa/ListDetailSoal';
import HasilLatihanPribadi from '../page/Mahasiswa/HasilLatihanPribadi';

const Drawer = createDrawerNavigator();
var data={};
var url ="";

const CustomDrawer = props =>{
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{ 
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems: "center",
          padding:20,
          backgroundColor:"#f6f6f6",
          marginBottom:20,
          
         }}
      >
        <View>
          <Text style={{ textTransform: 'uppercase'}}>{data.nama}</Text>
          <Text>{data.role === "dosen"?"NIDN:"+data.iduser:"NIM:"+data.iduser}</Text>
        </View>
        <Image style={{width:60,height:60, borderRadius:30}}
          source={{uri:url+'/user-photo/'+data.fotouser}}
        />
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}
export class DrawerList extends Component {
  componentDidUpdate(){
    data = this.props.dataUser
    url=this.props.baseURL
  }
    render() {
        return (
            <Drawer.Navigator
                drawerContent={(props)=><CustomDrawer {...props}/>}
                initialRouteName="Apps Launched"
            >
                <Drawer.Screen 
                  options={{headerShown: false,
                      drawerItemStyle:{ height: 0 },
                      swipeEnabled:false}}
                  name="Apps Launched" 
                  component={Router} />

                {this.props.dataUser.role === "dosen"?(
                  <>
                  {/* START DOSEN MENU  */}
                    <Drawer.Screen 
                      options={{headerShown: true,
                          drawerLabel:"Menu",
                          headerTitle:"Code Leaner",
                          swipeEnabled:true}}
                      name="Menu Awal Dosen" 
                      component={MenuAwalDosen} />

                    <Drawer.Screen 
                      options={{headerShown: true,
                          
                          drawerLabel:"Soal",
                          headerTitle:"Soal",
                          swipeEnabled:true}}
                      name="Soal Dosen" 
                      component={SoalDosen} />


                    <Drawer.Screen 
                      options={{
                          headerShown: true,
                          drawerItemStyle:{ height: 0 }
                        }}
                      name="Tambah Soal Dosen" 
                      component={TambahSoalDosen} />


                    <Drawer.Screen 
                      options={{
                          headerShown: true,
                          drawerItemStyle:{ height: 0 }
                        }}
                      name="Pilih Soal" 
                      component={PilihSoal} />


                    <Drawer.Screen 
                      options={{
                          headerShown: true,
                          drawerLabel:"List Mahasiswa",
                          headerTitle:"List Mahasiswa",
                          swipeEnabled:true
                        }}
                      name="List Mahasiswa" 
                      component={ListMahasiswa} />


                    <Drawer.Screen 
                      options={{
                          headerShown: true,
                          drawerItemStyle:{ height: 0 },
                          headerTitle:"Hasil Latihan",
                          swipeEnabled:true
                        }}
                      name="Hasil Latihan" 
                      component={HasilLatihan} />

                  {/* END DOSEN MENU  */}

                  </>
                ):(
                  <>

                    {/* START MAHASISWA MENU  */}
                    
                    <Drawer.Screen 
                      options={{headerShown: true,
                          drawerLabel:"Menu",
                          headerTitle:"Code Leaner",
                          swipeEnabled:true}}
                      name="Menu Awal Mahasiswa" 
                      component={MenuAwalMahasiswa} />

                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerLabel:"Soal",
                            headerTitle:"Soal",
                            swipeEnabled:true}}
                        name="Soal Mahasiswa" 
                        component={SoalMahasiswa} />

                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerLabel:"List Dosen",
                            headerTitle:"List Dosen",
                            swipeEnabled:true}}
                        name="List Dosen" 
                        component={ListDosen} />

                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerItemStyle:{ height: 0 },
                            headerTitle:"History Soal",
                            swipeEnabled:true}}
                        name="List Detail Soal" 
                        component={ListDetailSoal} />
                        
                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerItemStyle:{ height: 0 },
                            headerTitle:"Hasil Latihan",
                            swipeEnabled:true}}
                        name="Hasil Latihan Pribadi" 
                        component={HasilLatihanPribadi} />

                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerItemStyle:{ height: 0 },
                            headerTitle:"Tambah Dosen",
                            swipeEnabled:true}}
                        name="Tambah Dosen" 
                        component={TambahDosen} />



                      <Drawer.Screen 
                        options={{headerShown: true,
                            
                            drawerItemStyle:{ height: 0 },
                            headerTitle:"Soal",
                            swipeEnabled:true}}
                        name="Isi Soal" 
                        component={IsiSoal} />

                    {/* END MAHASISWA MENU  */}
                  </>
                )
              
                
              }
                
                  <Drawer.Screen 
                    options={{headerShown: true,
                        drawerLabel:"Logout",
                        swipeEnabled:true}}
                    name="Logout" 
                    component={Logout} />
            </Drawer.Navigator>
        )
    }
}

const mapStateToProps = (state) => ({
    
    dataUser:state.LoginReducer,
    baseURL:state.URLReducer.url
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerList,CustomDrawer)
