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
import {findById, save} from '../../../actions/items';
import {connect} from 'react-redux';
import styles from './styles';
import {showError} from '../../../utils/Toast';
export class ItemsScreen extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      name: '',
    };
  }

  componentDidMount() {
    const {id} = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {saveData, saveError, data, error, navigation} = this.props;
    if (prevProps.data !== data) {
      this.setState({...data});
    } else if (prevProps.saveData !== saveData) {
      navigation.navigate('Items');
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
    const {id, name} = this.state;
    const errorData = saveError?.data;
    console.log('saveerroor', saveError);

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Item Detail" />
        <Content>
          <Card style={styles.cardImage}>
            <ImageBackground
              source={require('../../../../assets/images/form.jpg')}
              style={styles.image}></ImageBackground>
          </Card>
          <Card style={styles.form}>
            <Form>
              {id && (
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input disabled value={id.toString()} />
                </Item>
              )}
              <Item floatingLabel last error={errorData?.name != null}>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChangeText={value => this.onChange('name', value)}
                />
              </Item>
              <View>
                {console.log('eror', errorData)}
                {errorData?.name && (
                  <Text style={styles.error}>{errorData?.name[0]}</Text>
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
  data: state.itemsId.data,
  loading: state.itemsId.loading || state.savedItems.loading,
  error: state.itemsId.error,
  saveData: state.savedItems.data,
  saveError: state.savedItems.error,
});

const mapDispatchToProps = {
  findById,
  save,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);
