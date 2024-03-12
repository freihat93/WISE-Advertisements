import React from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native'



class Home extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return{
      header:()=> <View style={styles.header}>
        </View>
    }
  }

  render(){
    console.log(new Date().getDate()+'/'+new Date().getMonth() + 1 +'/'+new Date().getFullYear()+'  '+new Date().getHours()+':'+new Date().getMinutes())
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center', width:'100%'}}>
        <ImageBackground
        source={require('../../assets/dot2.png')}
        resizeMode="repeat"
        style={styles.background}/>


      <View style={styles.vew}>
        <Image source={require('../../assets/logo.png')} style={styles.img}  resizeMode='contain' />

        <Text style={{fontSize:30, fontWeight:'bold', color:'#1e272e', marginVertical:'12%'}} >W.I.S.E Advertisement</Text>

        <TouchableOpacity style={[styles.buttons, {backgroundColor:'#cc3663'}]} onPress={()=>this.props.navigation.navigate('logIn')}>
        <Text style={[styles.txt, {color:'white'}]}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttons, {borderColor:'#95a5a5', borderWidth:1}]}  onPress={()=>this.props.navigation.navigate('signUp')}>
        <Text style={styles.txt}>SIGN UP</Text>
        </TouchableOpacity>
      </View>


      </View>

    );
  }; 
}

const styles=StyleSheet.create({
  header:{
    width:'100%',
    height:20,
    backgroundColor:'transparent'
  },
  background: {
    flex: 1,
    width: '100%',
    
  },
  img:{
    width:'47%',
    height:'29%'
  },
  vew:{
    position:'absolute',
    height:'90%',
    width:'85%',
    alignItems:'center',
    justifyContent:'center',
    maxWidth:415,
    maxHeight:620
  },
  txt:{
    fontSize:24,
    fontWeight:'700'
  },
  buttons:{
    width:'80%',
    height:'10%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginBottom:13,
    backgroundColor:'#ffffff'
  }
});

export default Home;
