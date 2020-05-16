import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {connect} from 'react-redux';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {login} from '../../actions/login';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    const {data, navigation} = this.props;
    if (prevProps.data !== data) {
      if (data?.username != null) {
        navigation.navigate('Main');
      }
    }
  }

  login = () => {
    this.props.login(this.state.data);
  };

  onChangeText = (name, value) => {
    this.setState({data: {...this.state.data, [name]: value}});
  };

  onLoginPres = () => {};

  render() {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <Container style={styles.container}>
        <View style={{padding: 10, paddingTop: 50}}>
          <Image
            source={require('../../../assets/images/kisspng.png')}
            style={{height: 200, width: 370, resizeMode: 'contain'}}
          />
        </View>
        <Text style={styles.textm}>Mobile</Text>
        <Text style={styles.text}>Point Of Sales</Text>
        <View style={styles.body}>
          <View style={styles.cardHeader}>
            <Card style={styles.card}>
              <CardItem style={styles.cardItem}>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        'https://pngimage.net/wp-content/uploads/2018/06/gestion-stock-png-9.png',
                    }}
                  />
                  <Body>
                    <Text style={styles.signup}>ALREADY ACCOUNT?</Text>
                    <Text note style={styles.signup}>
                      Login to take the App
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              <View cardBody style={styles.cardBody}>
                <Item style={styles.email}>
                  <Input
                    returnKeyType="next"
                    placeholder="Username"
                    style={styles.input}
                    value={data.username}
                    onChangeText={value => this.onChangeText('username', value)}
                  />
                </Item>
                <Item style={styles.password}>
                  <Input
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={data.password}
                    onChangeText={value => this.onChangeText('password', value)}
                  />
                </Item>
              </View>
              <TouchableOpacity style={styles.button} onPress={this.login}>
                <View>
                  <Text style={styles.textLogin}>Login</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login?.data,
  loading: state.login?.loading,
  error: state.login?.error,
});

const mapDispatchToProps = {
  login,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
