import React, {Component} from 'react';
import {Header, Title, Button, Left, Body, Icon, Text} from 'native-base';
import PropTypes from 'prop-types';
import {StyleSheet, View, StatusBar, Alert} from 'react-native';

class CommonHeader extends Component {
  onMenuPress = () => {
    this.props.navigation.openDrawer();
  };

  onBackPress = () => {
    this.props.navigation.goBack();
  };

  onLogout = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('LoginScreen'),
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    const {navigation, hideLeftButton, title} = this.props;
    return (
      <Header style={{backgroundColor: '#ffa5d8'}}>
        <View>
          <StatusBar backgroundColor="#92ddea" />
        </View>
        {!hideLeftButton && (
          <Left>
            {typeof navigation.openDrawer === 'function' ? (
              <Button
                transparent
                onPress={this.onMenuPress}
                style={styles.button}>
                <Icon name="menu" />
              </Button>
            ) : (
              <Button transparent onPress={this.onBackPress}>
                <Icon name="ios-arrow-back" />
              </Button>
            )}
          </Left>
        )}
        <Body>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        <Body>
          <Button
            onPress={this.onLogout}
            style={{
              backgroundColor: '#ffa5d8',
              elevation: 0,
            }}>
            <Text>Logout</Text>
          </Button>
        </Body>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  button: {},
  title: {},
  container: {
    padding: 0,
  },
});

CommonHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  hideLeftButton: PropTypes.bool,
  title: PropTypes.string,
};

export default CommonHeader;
