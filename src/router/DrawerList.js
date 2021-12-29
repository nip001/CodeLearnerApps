import { createDrawerNavigator } from '@react-navigation/drawer';
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
import { View } from 'react-native';
import SoalMahasiswa from '../page/Mahasiswa/SoalMahasiswa';

const Drawer = createDrawerNavigator();

export class DrawerList extends Component {
    render() {
        return (
            <Drawer.Navigator
                initialRouteName="Apps Launched"
            >
                <Drawer.Screen 
                  options={{headerShown: false,
                      drawerItemStyle:{ height: 0 },
                      swipeEnabled:false}}
                  name="Apps Launched" 
                  component={Router} />

                {this.props.role === "dosen"?(
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
    
    role:state.LoginReducer.role
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerList)
