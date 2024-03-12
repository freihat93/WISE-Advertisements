import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Dimensions,
        ImageBackground, AsyncStorage, KeyboardAvoidingView, ScrollView} from 'react-native';
import Data from '../components/Data';


var arr=[{"name":'System Admin', 'profile':'', "id":'111', "pass":'111', "type":'admin'}];
         
const height=Dimensions.get('window').height;
class LogIn extends React.Component{
  
  constructor(props){
    super(props)
    data = new Data();
  }

  state={
    id:'',
    pass:''
  }


  check =()=>{
    if(this.state.id.trim() === '' || this.state.pass.trim() === '')
      alert('check your id and/or password')

    else{
      const pass = this.state.pass;
      const id = this.state.id;

      this.logIn(id, pass)
    }
  }

  logIn = async(id, pass) =>{
    try {
            const value = await AsyncStorage.getItem('arr');
            if (value !== null)
              arr = JSON.parse(value) ;
          } catch (error) {alert("error login")}

            const res=arr.find(i=>i.id===id)
              if(res === undefined)
                alert("user doesnt exist");

              else
              {
                  if(res.pass !== pass){alert("password incorrect")}
                  else if(res.pass === pass){
                    const k=arr.find(i=>i.id===id);
                    this.props.navigation.navigate('newsScreen', {type:k})
                    this.setState({id:'', pass:''})
                  }
              }
  }


  ttt = async()=>{
    try {
      await AsyncStorage.setItem('arr', JSON.stringify(arr));
      alert('new users added')
    } catch (error) {alert("error login")}

    // try {
    //   await AsyncStorage.removeItem('arr');
    //   alert('storage users cleared')
    // } catch (error) {alert('the error : '+error)}
  }


  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={{flex:1}} keyboardVerticalOffset={50}>
        <ScrollView style={{flex:1, width:'100%'}} showsHorizontalScrollIndicator={false}>
        <View style={{justifyContent:'center', alignItems:'center', width:'100%', height:height-80}}>
          
          <ImageBackground
          source={require('../../assets/dot2.png')}
          resizeMode="repeat"
          style={{height:'100%', width:'100%'}}/>
  
  
        <View style={styles.vew}>
  
         <Image source={require('../../assets/logo.png')} style={styles.img} resizeMode='contain'/>
         
         
             <Text style={{fontSize:25, fontWeight:'bold', color:'#cc3663', marginVertical:'8%'}}>Log in</Text>
             <TextInput style={styles.input} placeholder="User ID" onChangeText={(i)=>this.setState({id:i})} maxLength={10} value={this.state.id} keyboardType='numeric'/>
             <TextInput style={styles.input} placeholder="Password" onChangeText={(p)=>this.setState({pass:p})} value={this.state.pass} secureTextEntry/>
  
           <TouchableOpacity style={styles.login}  onPress={()=>this.check()}>
             <Text style={styles.txt}>LOGIN</Text>
           </TouchableOpacity>
         </View>
         
        </View>

        </ScrollView>
      </KeyboardAvoidingView>
      
    );
  }; 
}

const styles=StyleSheet.create({
    vew:{
      height:'90%',
      width:'85%',
      borderColor:'red',
      borderWidth:0,
      alignItems:'center',  
      justifyContent:'center',
      position:'absolute',
      maxWidth:415,
      maxHeight:620,
      
    },
    img:{
        width:'47%',
        height:'29%',
    },
  
    input:{
        width:'85%',
        height:'8%',
        borderColor:'#b2bec3',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:7,
        marginVertical:5,
        fontSize:18,
        backgroundColor:'#ffffff'
    },
    txt:{
      fontSize:24,
      fontWeight:'600',
      color:'white'
    },
    login:{
      width:'85%',
      height:'9%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      marginVertical:5,
      backgroundColor:'#cc3663'
    }
});

export default LogIn;
