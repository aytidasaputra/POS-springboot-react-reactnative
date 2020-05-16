import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Label,
  Item,
  Input,
  Button,
  Toast,
  Icon,
  Picker,
  Card,
  CardItem,
  Body,
} from 'native-base';
import {View, ImageBackground} from 'react-native';
import {CommonHeader} from '../../../component/CommonHeader';
import {findById, save} from '../../../actions/transactions';
import {connect} from 'react-redux';
import styles from './styles';
import {showError, showErrorNumber} from '../../../utils/Toast';
class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      amount: '',
      type: '',
      description: '',
    };
  }
  name;

  componentDidMount() {
    const {id} = this.state;
    if (id) {
      this.props.findById(this.state.id);
    } else {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {saveData, saveError, data, error, navigation} = this.props;
    if (prevProps.data !== data) {
      this.setState({...data});
    } else if (prevProps.saveData !== saveData) {
      navigation.navigate('Transactions');
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (saveError && prevProps.saveError !== saveError) {
      showError(saveError);
    }
  }

  reload({search, sort = 'asc', page = 0} = {}) {
    this.props.findAll({search: {name: search}, sort, page});
  }

  onSubmit = () => {
    if (isNan(amount)) {
      showErrorNumber();
    } else {
      this.props.save(this.state);
    }
  };

  onChange = (name, value) => {
    this.setState({[name]: value});
  };

  onValueChange = value => {
    this.setState({
      type: value,
    });
  };

  render() {
    const {loading, navigation, saveError} = this.props;
    const {id, amount, type, description} = this.state;
    const errorData = saveError?.data;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Transactions Detail" />
        <Content>
          <Card style={styles.cardImage}>
            <ImageBackground
              source={require('../../../../assets/images/form.jpg')}
              style={styles.image}></ImageBackground>
          </Card>
          <Card style={styles.cardForm}>
            <Form>
              {id && (
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input disabled value={id.toString()} />
                </Item>
              )}
              <View style={{paddingLeft: 5}}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={type}
                  onValueChange={this.onValueChange}>
                  <Picker.Item label="Type :" value={null} />
                  <Picker.Item label="  SELL" value="SELL" />
                  <Picker.Item label="  PURCHASE" value="PURCHASE" />
                </Picker>
                {errorData?.type && (
                  <Text style={styles.error}>{errorData.type[0]}</Text>
                )}
              </View>
              <Item floatingLabel last error={errorData?.description != null}>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChangeText={value => this.onChange('description', value)}
                />
              </Item>
              <Item floatingLabel last error={errorData?.amount != null}>
                <Label>Amount</Label>
                <Input
                  maxLength={10}
                  value={amount.toString()}
                  onChangeText={value => this.onChange('amount', value)}
                  keyboardType="number-pad"
                />
              </Item>
            </Form>
            <CardItem>
              <Body>
                <Button
                  success
                  rounded
                  style={styles.button}
                  onPress={this.onSubmit}
                  disabled={loading}>
                  <Icon
                    type="FontAwesome"
                    name="save"
                    style={{paddingRight: 0, fontSize: 30}}
                  />
                  <Text style={{paddingLeft: 0}}>Save</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.transactionsId.data,
  loading: state.transactionsId.loading || state.savedTransactions.loading,
  error: state.transactionsId.error,
  saveData: state.savedTransactions.data,
  saveError: state.savedTransactions.error,
});

const mapDispatchToProps = {
  findById,
  save,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen);
