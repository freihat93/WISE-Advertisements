import React from 'react';
import {View, StyleSheet, Text, AsyncStorage, Image, Button, Linking} from 'react-native';
import * as ImagePicker from 'expo-image-picker';



class TestImage extends React.Component{
  
  constructor(props){
    super(props)
  }

  state={
      result:null,
      image:'m',
      album:'https://s3-eu-west-1.amazonaws.com/static.jbcgroup.com/amd/pictures/8b1a82a9837e8595ac75459bd0f280f6.jpg'
  }


  componentDidMount = async () =>{
    try {
        const value = await AsyncStorage.getItem('img');
        if (value !== null)
          this.setState({image:value})
      } catch (error) {alert(error)}
  }


  camera = async() =>{
     await ImagePicker.requestCameraPermissionsAsync();
    // let y=await ImagePicker.getCameraPermissionsAsync();
   try{
    const {cancelled , uri}  = await ImagePicker.launchCameraAsync({allowsEditing: false})

    if(!cancelled){
    this.setState({image:uri})
    try {
      await AsyncStorage.setItem('img', uri);
    } catch (error) {alert(error)}}

   }catch(err) {alert(err)}
    
        //    try {
        //     const value = await AsyncStorage.getItem('img');
        //     if (value !== null)
        //       console.log(value)
        //   } catch (error) {}

  }


  album = async () =>{
    await ImagePicker.requestCameraRollPermissionsAsync();

    try{
    const {cancelled , uri}  = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:2})

    if(!cancelled){
      this.setState({album:uri})
      try {
        await AsyncStorage.setItem('album', uri);
      } catch (error) {alert(error)}
    }
    
  }catch(err) {alert(err)}

  //  try {
  //   const value = await AsyncStorage.getItem('album');
  //   if (value !== null)
  //     console.log(value)
  // } catch (error) {}
  }




  render(){
    return(
        <View style={{flex:1}}>
          <Button title="select image" onPress={()=>this.camera()}/>
            <Image style={{width:200, height:200, alignSelf:'center'}} source={{uri:this.state.image}}/>
          <Button title="select from album" onPress={()=>this.album()}/>
            <Image style={{width:200, height:200, alignSelf:'center'}} source={{uri:this.state.album}}/>
        </View>
    );
  }; 
}

const styles=StyleSheet.create({});

export default TestImage;



// https://s3-eu-west-1.amazonaws.com/static.jbcgroup.com/amd/pictures/8b1a82a9837e8595ac75459bd0f280f6.jpg