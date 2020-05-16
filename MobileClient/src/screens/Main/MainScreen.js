import React, {Component} from 'react';
import {drawerRoutes} from '../../configs/drawerRoutes';
import CommonDrawer from '../../component/CommonDrawer/CommonDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import styles from './styles';

const Drawer = createDrawerNavigator();

function drawerContent(props) {
  return <CommonDrawer {...props} />;
}

class MainScreen extends Component {
  render() {
    return (
      <Drawer.Navigator
        backBehavior="initialRoute"
        drawerContent={drawerContent}>
        {drawerRoutes.map((route, index) => (
          <Drawer.Screen
            key={index}
            name={route.name}
            component={route.component}
          />
        ))}
      </Drawer.Navigator>
    );
  }
}

export default MainScreen;
