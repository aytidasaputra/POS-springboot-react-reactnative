import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
} from 'native-base';
import {ImageBackground} from 'react-native';
import styles from './styles';

const items = [
  {
    icon: 'home',
    label: 'Home',
    target: 'Home',
  },
  {
    icon: 'cloud-circle',
    label: 'Items',
    target: 'Items',
  },
  {
    icon: 'keypad',
    label: 'Units',
    target: 'Units',
  },
  {
    icon: 'pulse',
    label: 'Transactions',
    target: 'Transactions',
  },
  {
    icon: 'paper',
    label: 'Stocks',
    target: 'Stocks',
  },
  {
    icon: 'paper',
    label: 'Stock Summary',
    target: 'StockSummary',
  },
];

function DrawerItem({navigation, item}) {
  return (
    <ListItem icon onPress={() => navigation.navigate(item.target)}>
      <Left>
        <Button
          style={{backgroundColor: '#ffa5d8'}}
          onPress={() => navigation.navigate(item.target)}>
          <Icon active name={item.icon} />
        </Button>
      </Left>
      <Body>
        <Text style={{color: '#fff'}}>{item.label}</Text>
      </Body>
    </ListItem>
  );
}

class CommonDrawer extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <Container style={{backgroundColor: '#92ddea'}}>
        <ImageBackground
          source={require('../../../assets/images/ivn.jpg')}
          style={styles.image}></ImageBackground>
        <Text style={styles.textm}>Mobile</Text>
        <Text style={styles.text}>Point Of Sales</Text>
        <Content>
          {items.map((item, index) => (
            <DrawerItem key={index} navigation={navigation} item={item} />
          ))}
        </Content>
      </Container>
    );
  }
}

export default CommonDrawer;
