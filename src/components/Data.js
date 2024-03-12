import React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';


var arr=[{"name":'Omar', "id":'123', "pass":'123', "type":'admin', 'profile':""}];
class LogIn extends React.Component{
    constructor(props){
        super(props);
    }
 
    
    signUp = async(name, id, pass, type='normal') =>{
        try {
            const value = await AsyncStorage.getItem('arr');
            if (value !== null)
              arr = JSON.parse(value) ;
          } catch (error) {}

        const res=arr.find(i=>i.id===id);
              if(res !== undefined)
                alert('This user exists!')

              else {
                  {this.addUser(name, id, pass, type)}
                }
        
    }

    addUser = async (name, id, pass, type) =>{
        arr.push({"name":name, "id":id, "pass":pass, "type":type})
        try {
            await AsyncStorage.setItem('arr', JSON.stringify(arr));
            alert('Successfully regestered')
        } catch (error) {alert('error signup')}
    }



  render(){
    return(
      <View>
      </View>
    );
  }; 
}

const styles=StyleSheet.create({});

export default LogIn;
