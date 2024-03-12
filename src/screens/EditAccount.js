import React from 'react';
import {View, StyleSheet, Button, Image, AsyncStorage} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';


class EditAccount extends React.Component{
  
  constructor(props){
    super(props)
  }

  state={
      user:this.props.navigation.getParam("accInfo"),
      Image:this.props.navigation.getParam("accInfo").profile
  }

  takePhoto = async()=>{
    await ImagePicker.requestCameraPermissionsAsync();
    try{
        const {cancelled , uri}  = await ImagePicker.launchCameraAsync({allowsEditing: true, cancelled})
    
        if(!cancelled){
            this.setState({Image:uri})
    }
       }catch(err) {alert(err)}
}

selectFromAlbum = async()=>{
    await ImagePicker.requestCameraRollPermissionsAsync();

    try{
    const {cancelled , uri}  = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:3})

    if(!cancelled){
        this.setState({Image:uri})
    }
    
  }catch(err) {alert(err)}
}


saveImage = async () =>{
  let t=this.state.user;
  t.profile=this.state.Image;
  this.setState({user:t})
  
  var arr=[];

  try {
    const value = await AsyncStorage.getItem('arr');
    if (value !== null)
      arr = JSON.parse(value);
  } catch (error) {alert("error change profile photo")}

  arr.map(i=>{
    if(i.id === this.state.user.id)
      i.profile=this.state.Image;
  })

  try {
    await AsyncStorage.setItem('arr', JSON.stringify(arr));
      alert('Profile Photo Changed')
  } catch (error) {alert("error change profile photo")}
}


  render(){
    return(

        <View style={{width:'100%', height:'100%', justifyContent:'center'}}>

           <View style={styles.topView}>
            {this.state.Image === '' ? <Image source={require('../../assets/profile.png')} style={styles.img}/> :
            <Image source={{uri:this.state.Image}} style={styles.img}/>}
           </View>

           <View style={styles.bottomView}>
              <Ionicons name="md-close" style={{fontSize:40, color:'#ff6b6b'}} onPress={()=>this.setState({Image:''})}/>
              <Ionicons name='ios-camera' style={{fontSize:40, color:'#636e72'}} onPress={()=>this.takePhoto()}/>
              <Ionicons name='md-albums' style={{fontSize:35, color:'#636e72'}} onPress={()=>this.selectFromAlbum()}/>
              <Ionicons name="md-checkmark" style={{fontSize:40, color:'#00b894'}} onPress={()=>this.saveImage()}/>
           </View>
          
        </View>
     );
  }; 
}

const styles=StyleSheet.create({
    img:{
        width:200,
        height:200,
        borderRadius:3,
        alignSelf:'center',
        marginBottom:30,
    },
    topView:{
      width:'100%',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    bottomView:{
      width:'100%',
      borderTopColor:'#dfe6e9',
      borderTopWidth:1,
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'space-between',
      paddingVertical:4,
      paddingHorizontal:6
    }
});

export default EditAccount;
