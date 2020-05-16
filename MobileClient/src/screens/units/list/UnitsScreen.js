import React, {Component} from 'react';
import {
  Container,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Fab,
  Toast,
  View,
  Item,
  Input,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {RefreshControl, Alert} from 'react-native';
import {CommonHeader} from '../../../component/CommonHeader';
import {findAll, deleteById} from '../../../actions/units';
import {connect} from 'react-redux';
import styles from './styles';
import {showError} from '../../../utils/Toast';

class UnitsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      search: '',
      params: {
        search: '',
        sort: 'asc',
        page: 0,
        size: 20,
      },
    };
  }

  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps, prevState) {
    const {data, error, saveData, deleteData, deleteError} = this.props;
    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data?.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page,
        },
      });
    } else if (
      prevProps.deleteData !== deleteData ||
      prevProps.saveData !== saveData
    ) {
      this.onRefresh();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      showError(deleteError);
    }
  }

  reload({search, sort = 'asc', page = 0} = {}) {
    this.props.findAll({search: {name: search}, sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: {...params, page: 0},
      },
      () => this.reload(this.state.params),
    );
  };

  onEndReached = () => {
    const {data, total, params} = this.state;
    console.log('data:', data);

    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1,
      });
    }
  };

  onSearch = () => {
    const {search, params} = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: {...params, search: search, page: 0},
      },
      () => this.reload(this.state.params),
    );
  };
  onChangeText = () => {};

  onDelete = unit => {
    Alert.alert(
      'Confirmation',
      'Delete this unit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.deleteById(unit.id)},
      ],
      {cancelable: true},
    );
  };

  onShowForm = unit => {
    this.props.navigation.navigate('UnitDetail', unit ? {id: unit.id} : null);
  };
  render() {
    const {navigation, loading} = this.props;
    const {data, search} = this.state;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Units" />
        <View style={styles.content}>
          <Item>
            <Input
              placeholder="Search"
              value={search}
              onChangeText={search => this.setState({search})}
            />
            <Button transparent onPress={this.onSearch}>
              <Icon active name="search" />
            </Button>
          </Item>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item}) => (
              <RowUnit item={item} onPress={this.onShowForm} />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            renderHiddenItem={data => (
              <View style={styles.hiddenItem}>
                <Button
                  style={styles.deleteButton}
                  onPress={() => this.onDelete(data.item)}>
                  <Icon style={styles.icon} name="md-trash" />
                </Button>
              </View>
            )}
            leftOpenValue={30}
          />
        </View>
        <Fab onPress={this.onShowForm} style={{backgroundColor: '#be9ddf'}}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

function RowUnit({onPress, item}) {
  return (
    <ListItem style={styles.item} avatar onPress={() => onPress(item)}>
      <Left style={styles.body}>
        <Thumbnail
          rounded
          source={{
            uri:
              'https://thepioneerwoman.com/wp-content/uploads/2016/11/how-to-make-a-matcha-latte-01.jpg?fit=1999%2C1333',
          }}
        />
      </Left>
      <Body>
        <Text>{item.name}</Text>
      </Body>
      <Body>
        <Text>{item.description}</Text>
      </Body>
      <Button transparent onPress={() => onPress(item)}>
        {/* TODO */}
        <Icon active name="ios-arrow-forward" />
      </Button>
    </ListItem>
  );
}

const mapStateToProps = state => ({
  data: state.units.data,
  deleteData: state.deletedUnitById.data,
  loading: state.units.loading || state.deletedUnitById.loading,
  error: state.units.error,
  deleteError: state.deletedUnitById.error,
  saveData: state.savedUnits.data,
});

const mapDispatchToProps = {
  findAll,
  deleteById,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitsScreen);
