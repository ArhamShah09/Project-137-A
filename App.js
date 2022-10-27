import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Details from './screens/Details';

const AppStackNavigator = createStackNavigator({
  homeScreen : {
    screen : Home,
    navigationOptions : {
      headerShown : false
    }
  },
  detailsScreen : {
    screen : Details,
    navigationOptions : {
      headerShown : false
    }
  }
}, 
{
  initialRouteName : 'homeScreen'
}) 

const AppContainer = createAppContainer(AppStackNavigator)

export default function App() {
  return (
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

