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
  Card,
  Icon,
  CardItem,
  Body,
} from 'native-base';
import {View, ImageBackground} from 'react-native';
import {CommonHeader} from '../../../component/CommonHeader';
import {findById, save} from '../../../actions/stocks';
import {connect} from 'react-redux';
import styles from './styles';
import {showError} from '../../../utils/Toast';
class StockScreen extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      item: '',
      quantity: '',
      unit: '',
    };
  }

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
      navigation.navigate('Stocks');
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
    this.props.save(this.state);
  };

  onChange = (name, value) => {
    this.setState({[name]: value});
  };
  render() {
    const {loading, navigation, saveError} = this.props;
    const {id, item, quantity, unit} = this.state;
    const errorData = saveError?.data;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Stock Detail" />
        <Content>
          <Card style={styles.cardImage}>
            <ImageBackground
              source={require('../../../../assets/images/form.jpg')}
              style={styles.image}></ImageBackground>
          </Card>
          <Card>
            <Form>
              {id && (
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input disabled value={id.toString()} />
                </Item>
              )}
              <Item floatingLabel last error={errorData?.item.name != null}>
                <Label>Item</Label>
                <Input
                  value={item.name}
                  onChangeText={value => this.onChange('item.name', value)}
                />
              </Item>
              <Item floatingLabel last error={errorData?.quantity != null}>
                <Label>Quantity</Label>
                <Input
                  value={quantity.toString()}
                  onChangeText={value => this.onChange('quantity', value)}
                  keyboardType="number-pad"
                />
              </Item>
              <Item floatingLabel last error={errorData?.unit.name != null}>
                <Label>Unit</Label>
                <Input
                  value={unit.name}
                  onChangeText={value => this.onChange('unit', value)}
                />
              </Item>
              <View>
                {errorData?.name && (
                  <Text style={styles.error}>{errorData?.name}</Text>
                )}
              </View>
            </Form>
            <CardItem>
              <Body>
                <Button
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
  data: state.stocksId.data,
  loading: state.stocksId.loading || state.savedStocks.loading,
  error: state.stocksId.error,
  saveData: state.savedStocks.data,
  saveError: state.savedStocks.error,
});

const mapDispatchToProps = {
  findById,
  save,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);
