import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import LogIn from './src/screens/LogIn';
import NewsScreen from './src/screens/NewsScreen';
import TestImage from './src/screens/TestImage';
import EditAccount from './src/screens/EditAccount';

const navigator = createStackNavigator(
  {
    home: Home,
    signUp:SignUp,
    logIn:LogIn,
    newsScreen:NewsScreen,
    testImage:TestImage,
    editAccount:EditAccount
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      title: 'WISE',
      headerBackTitle: 'Back'
    }
  } 
);

export default createAppContainer(navigator);