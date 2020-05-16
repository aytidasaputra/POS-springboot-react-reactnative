import React, {Component} from 'react';
import {
  Container,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  Icon,
  View,
  Item,
  Input,
  Card,
  CardItem,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {RefreshControl, Alert} from 'react-native';
import {CommonHeader} from '../../../component/CommonHeader';
import {stockSummary} from '../../../actions/stocks';
import {connect} from 'react-redux';
import styles from './styles';
import {showError} from '../../../utils/Toast';

class StockSummary extends Component {
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

  componentDidUpdate(prevProps) {
    const {data, error, saveData, deleteData} = this.props;
    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data],
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
    }
  }

  reload({search, sort = 'asc', page = 0} = {}) {
    this.props.stockSummary({search: {name: search}, sort, page});
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

  render() {
    const {navigation, loading} = this.props;
    const {data, search} = this.state;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Stock Summary" />
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
              <RowItem item={item} onPress={this.onShowForm} />
            )}
            keyExtractor={item => item.id}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </Container>
    );
  }
}

function RowItem({onPress, item}) {
  return (
    <ListItem style={styles.item}>
      <Card style={styles.card}>
        <CardItem>
          <Left style={styles.body}>
            <Thumbnail
              style={{width: 70, height: 70}}
              square
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhRQ4oVy2g1PSomcRAfNkANWpMMNVd1ZlDXSW8ytsUs_qtClSB&usqp=CAU',
              }}
            />
          </Left>
          <Body>
            <View style={styles.nameStock}>
              <Text style={styles.textStock}>{item?.name}</Text>
            </View>
            <View style={styles.noteStock}>
              <Text note>{item?.quantity}</Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    </ListItem>
  );
}

const mapStateToProps = state => ({
  data: state.stockSummary.data,
  loading: state.stockSummary.loading,
  error: state.stockSummary.error,
});

const mapDispatchToProps = {
  stockSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockSummary);
