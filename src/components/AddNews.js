import React,{useState} from 'react';
import { Image, View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



const MovieDetails =(props)=>{
const [visible, setVisible]=useState(props.visible);

const [news, setNews]=useState();
const [image, setImage]=useState('');
  

const selectFromAlbum = async()=>{
    await ImagePicker.requestCameraRollPermissionsAsync();

    try{
    const {cancelled , uri}  = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, aspect:2})

    if(!cancelled){
        setImage(uri);
      try {
        await AsyncStorage.setItem('album', uri);
      } catch (error) {alert(error)}
    }
    
  }catch(err) {alert(err)}

}

const takePhoto = async()=>{
    await ImagePicker.requestCameraPermissionsAsync();
    try{
        const {cancelled , uri}  = await ImagePicker.launchCameraAsync({allowsEditing: true, cancelled})
    
        if(!cancelled){
        setImage(uri);
        try {
          await AsyncStorage.setItem('img', uri);
        } catch (error) {alert(error)}}
    
       }catch(err) {alert(err)}
}

const addNews = async()=>{
    if(image === '' && news === undefined){}
    else{
      props.addedData([image, news])
      props.visibleState(false);
    }
    
}


    return(
      <View>
<Modal
    visible={visible}
    transparent={true}
    animationType={"slide"}
    onRequestClose={() => props.visibleState(false) } > 


  <View style={{flex:1, width:'100%', backgroundColor:'transparent', justifyContent:'flex-end', alignItems:'center'}}>

        <TouchableOpacity style={{height:'30%', backgroundColor:'rgba(45, 52, 54,0.7)', width:'100%'}} onPress={()=>props.visibleState(false)} activeOpacity={1}/>

<ScrollView style={{width:'100%', flex:1, backgroundColor:'#dfe6e9'}}>
     
        <Ionicons name="md-close" style={{fontSize:37, padding:'1%',marginRight:7, alignSelf:'flex-end', color:'#576574'}} onPress={()=>props.visibleState(false)}/>
        <TextInput style={styles.newsInput} placeholder="Add Post" multiline placeholderTextColor='#636e72' onChangeText={(txt)=>setNews(txt)} value={news}/>

        <View style={{flexDirection:'row', width:'100%', marginVertical:'1%'}}>
            <View style={{flex:1, flexDirection:'row', paddingHorizontal:7}}>
                <Ionicons name='ios-camera' style={{fontSize:50, padding:'4%', color:'rgba(47, 53, 66,0.7)'}} onPress={()=>takePhoto()}/>
                <MaterialIcons name='photo' style={{fontSize:45, padding:'4%', color:'rgba(47, 53, 66,0.7)'}} onPress={()=>selectFromAlbum()}/>
            </View>
            
            <View style={{flex:1, justifyContent:'center', paddingHorizontal:7}}>
                <Text style={styles.btnAdd} onPress={()=>addNews()}>Post</Text>
            </View> 
        </View>

        <View style={{height:1, width:'96%', alignSelf:'center', backgroundColor:'#b2bec3', marginBottom:'4%'}}/>

        {image === '' ? <Text style={{fontSize:35, alignSelf:'center', textAlign:'center', paddingTop:'18%', color:'#7f8c8d', marginHorizontal:10}}>No image selected</Text> :
        <Image style={{width:'96%', alignSelf:'center', marginBottom:20, borderRadius:3, height:350}} source={{uri:image}} />}



     
</ScrollView>

  
  </View>


</Modal>
</View>
    )
  };
  

const styles = StyleSheet.create({
    newsInput:{
        width:'96%',
        minHeight:40,
        maxHeight:80,
        fontSize:20,
        backgroundColor:'#bdc3c7',
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:5
    },
    btnAdd:{
        fontSize:20,
        backgroundColor:'#2e86de',
        alignSelf:'flex-end',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:5,
        color:'#fff',
        // fontWeight:'bold'
    }
});

export default MovieDetails;
