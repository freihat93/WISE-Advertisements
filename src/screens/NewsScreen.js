import React from 'react';
import {View, StyleSheet, Text, AsyncStorage, ScrollView, TouchableOpacity, Button, Alert} from 'react-native';
import Cards from '../components/Cards';
import {MaterialIcons, SimpleLineIcons, Entypo} from '@expo/vector-icons';
import Data from '../components/Data';
import AddNews from '../components/AddNews';



class NewsScreen extends React.Component{
  
  static navigationOptions = ({ navigation }) => {
    return{
      gestureEnabled: false,
        header:()=> <View style={styles.header}>
          <View style={{flex:1}}><SimpleLineIcons name='logout' style={{fontSize:22, color:'#0984e3', alignSelf:'flex-start', marginBottom:5}} onPress={()=> Alert.alert(
              'Logout',
              'Do you want to logout?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => navigation.navigate('home')},
              ],
              {cancelable: false},
            ) }/>
          </View>
          <View style={{flex:2}}><Text style={{fontSize:22, color:'#0984e3', alignSelf:'center'}}>Advertisement</Text></View>
          <View style={{flex:1}}>{navigation.getParam('type').type === 'admin' ?
           <MaterialIcons name='menu' style={{fontSize:30, color:'#0984e3', alignSelf:'flex-end'}} onPress={()=>navigation.navigate('editAccount', {accInfo:navigation.getParam('type')})}/> :null}</View>
        </View>
    }
  }


  constructor(props){
    super(props);
    p = new Data();
  }

    state={
        postersArray:[],
        type:this.props.navigation.getParam('type'),
        openDialog:false,
        addNews:[],
        users:[],
        refresh:0,
    }


    //add new news dialog
    //this new news contain {admin photo and name} 'static to admin'   and image and details


    componentDidMount = async () =>{
         try {
            const value = await AsyncStorage.getItem('posters');
            if (value !== null)
              this.setState({ postersArray:JSON.parse(value) }) ;
          } catch (error) {alert('error loading news, please try again later')}

          try {
            const value = await AsyncStorage.getItem('arr');
            if (value !== null)
              this.setState({ users:JSON.parse(value) }) ;
          } catch (error) {alert('error loading news, please try again later')}

    }


    addNews = async(d) =>{
      this.setState({addNews:d})

      var arr=[];
      try {
            const value = await AsyncStorage.getItem('posters');
            if (value !== null)
              arr = JSON.parse(value) ;
          } catch (error) {}

        arr.push({'name':this.state.type.name, 'id':this.state.type.id, 'text':d[1], 'image':d[0], 'date':new Date().getDate()+'/'+new Date().getMonth() + 1 +'/'+new Date().getFullYear()+'  '+new Date().getHours()+':'+new Date().getMinutes()});
        this.setState({postersArray:arr});

         try {
            await AsyncStorage.setItem('posters', JSON.stringify(this.state.postersArray));
          } catch (error) {}
      }
    
      async componentDidUpdate(prevProps,prevState){
        
        if (prevState.refresh !== this.state.refresh) {
            try{
              try {
                const value = await AsyncStorage.getItem('posters');
                if (value !== null)
                  this.setState({ postersArray:JSON.parse(value), refresh:1 }) ;
              } catch (error) {alert('error deleting news, please try again later')}

               }catch(err){ alert(err) }
          }
        }
    

    clear = async()=>{
      try {
        await AsyncStorage.removeItem('posters');
        alert('storage cleared')
      } catch (error) {alert('the error : '+error)}
    }


  render(){
      const type = this.props.navigation.getParam('type');
    return(
      <View style={{flex:1, alignItems:'center', backgroundColor:'#a2b0be'}}>
      

        {/* this button clear all posts */}
        {/* <Button title="clear storage 'posters' " onPress={()=>this.clear()}/>   */}
        {type.type === 'admin'?<TouchableOpacity style={styles.addBtn} onPress={()=>this.setState({openDialog:true})} activeOpacity={0.7}>
          <Entypo name="new-message" style={{fontSize:25, color:'#57606f'}}/>
          <Text style={{fontSize:18, paddingHorizontal:10, color:'#57606f'}}>Add Post</Text>
        </TouchableOpacity>: null}
        


        {this.state.openDialog ? <AddNews visible={this.state.openDialog} addedData={(d)=>this.addNews(d)}
        visibleState={(v)=>this.setState({openDialog:v})} /> : null}
          

        <View style={{flex:1,width:'100%'}}>
          <ScrollView>
            
          {this.state.postersArray.map((i, index)=>{
              return (
                  <Cards index={index} key={Math.random()*999} text={i.text} image={i.image} admin={i.name} profileId={i.profile} date={i.date}
                  users={this.state.users.map(x=>{if(x.id===i.id) return x.profile})}
                  refresh={()=>this.setState({refresh:2})}
                  now={this.state.type.type}/>
              )})}
          </ScrollView>
        </View>
          
          
      </View>
    );
  }; 
}

const styles=StyleSheet.create({
  addBtn:{
    flexDirection:'row',
    width:'95%',
    height:'8%',
    backgroundColor:'#dfe6e9',
    marginVertical:7,
    borderColor:'rgba(164, 176, 190,0.7)',
    borderWidth:0.5,
    paddingHorizontal:5,
    paddingVertical:5,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  BottomView:{
    width:'100%',
    height:50,
    flexDirection:'row',
    backgroundColor:'rgba(99, 110, 114,0.5)'
  },
  input:{
    flex:1,
    fontSize:20,
    paddingHorizontal:5
  },
  header:{
    width:'100%',
    height:68,
    backgroundColor:'#dfe6e9',
    flexDirection:'row',
    padding:5,
    alignItems:'flex-end',
    justifyContent:'center',
    borderBottomColor:'#ced6e0',
    borderBottomWidth:1
  }
});

export default NewsScreen;
