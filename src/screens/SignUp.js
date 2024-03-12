import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Dimensions,
        ImageBackground, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Data from '../components/Data';



const height=Dimensions.get('window').height;
class SignUp extends React.Component{
  constructor(props){
    super(props)
    data = new Data();
    // patternAlpha='(?=.*[A-Z])' // uppercase letter

  }

  state={
    name:'',
    id:'',
    pass:'',
    conPass:'',
    conPassColor:'#b2bec3'
  }

  

  checkInfo = () =>{
    if(this.state.pass.trim() !== this.state.conPass.trim()){
        alert('Confirm Password!')
        this.setState({conPassColor:'#eb4d4b'})}
    // else if(this.state.name.trim() !== patternAlpha)
    //     alert('Name should be Alphabetical') 
    else if(this.state.pass.trim() === '' &&
     this.state.name.trim() === '' &&
     this.state.id.trim() === '' && 
     this.state.pass.trim() === '')
      alert('Please input your data!')
    else if(this.state.name.trim() === '' )
      alert('Your name is empty!')
    else if(this.state.id.trim() === '' )
      alert('Please check your User ID!')
    else if(this.state.pass.trim() === '' )
      alert('Please check your password!')
    else {
      const name = this.state.name;
      const id = this.state.id;
      const pass = this.state.pass;

      data.signUp(name, id, pass);
    }
  }

  checkPass = () =>{
    if(this.state.pass.trim() !== this.state.conPass.trim())
        this.setState({conPassColor:'#eb4d4b'})
    else if(this.state.pass.trim() === this.state.conPass.trim())
        this.setState({conPassColor:'#b2bec3'})
        Alert.alert(
          'Signup',
          'User created successfully!',
          [
          {
            text: 'Cancel',
            onPress: () => this.props.navigation.navigate('home'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this.props.navigation.navigate('logIn')},
        ],
        {cancelable: false},
        )
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
       
       
           <Text style={{fontSize:25, fontWeight:'bold', color:'#cc3663', marginVertical:'6%'}}>Create Account</Text>
           <TextInput style={styles.input} placeholder="Name" onChangeText={(n)=>this.setState({name:n})}/>
           <TextInput style={styles.input} placeholder="User ID" onChangeText={(i)=>this.setState({id:i})} maxLength={10} keyboardType='numeric'/>
           <TextInput style={styles.input} placeholder="Password" onChangeText={(p)=>this.setState({pass:p})} secureTextEntry/>
           <TextInput style={[styles.input, {borderColor:this.state.conPassColor}]} placeholder="Confirm password" onChangeText={(c)=>this.setState({conPass:c})} secureTextEntry onEndEditing={()=>this.checkPass()}/>

         <TouchableOpacity style={styles.signUp}  onPress={()=>this.checkInfo()}>
           <Text style={styles.txt}>SIGN UP</Text>
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
      borderColor:'red',
      borderWidth:0,
      width:'85%',
      alignItems:'center',  
      justifyContent:'center',
      position:'absolute',
      maxWidth:415,
      maxHeight:620,
      
    },
    img:{
        width:'47%',
        height:'29%'
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
    signUp:{
      width:'85%',
      height:'9%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
      marginVertical:5,
      backgroundColor:'#cc3663'
    }
});

export default SignUp;
