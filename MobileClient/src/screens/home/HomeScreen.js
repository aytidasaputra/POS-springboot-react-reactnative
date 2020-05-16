import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import {LineChart} from 'react-native-chart-kit';
import styles from './styles';
import {SliderBox} from 'react-native-image-slider-box';
import {CommonHeader} from '../../component/CommonHeader';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: false,
      images: [
        require('../../../assets/images/slide1.jpg'),
        require('../../../assets/images/slide2.jpg'),
        require('../../../assets/images/slide3.jpg'),
        require('../../../assets/images/slide4.jpg'),
        require('../../../assets/images/slide5.jpg'),
      ],
      data: [
        {
          id: 1,
          title: 'Items',
          color: '#ffa5d8',
          members: 8,
          image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        },
        {
          id: 1,
          title: 'Units',
          color: '#87CEEB',
          members: 6,
          image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        },
        {
          id: 2,
          title: 'Transactions',
          color: '#87CEEB',
          members: 12,
          image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        },
        {
          id: 3,
          title: 'Stocks',
          color: '#ffa5d8',
          members: 5,
          image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
        },
      ],
    };
  }

  clickEventListener(item) {
    Alert.Alert(item.title);
  }

  summary = prevProps => {
    const {data, navigation} = this.props;
    if (prevProps.data == data) {
      navigation.navigate('StockSummary');
    }
  };

  transaction = prevProps => {
    const {data, navigation} = this.props;
    if (prevProps.data == data) {
      navigation.navigate('Transactions');
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <ScrollView ref={this.scrollView}>
        <View>
          <CommonHeader
            style={{position: 'absolute'}}
            navigation={navigation}
            title="Home"
          />
        </View>
        <View style={styles.slider}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#ffa5d8"
            ImageComponentStyle={{borderRadius: 15, width: '95%'}}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />
        </View>
        <View>
          <Text style={styles.menu}>Menu</Text>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={this.state.scrollEnabled}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {backgroundColor: item.color}]}
                onPress={() => navigation.navigate(item.title)}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Image
                    style={styles.icon}
                    source={{
                      uri: 'https://img.icons8.com/ios/40/000000/settings.png',
                    }}
                  />
                </View>
                <Image style={styles.cardImage} source={{uri: item.image}} />
                <View style={styles.cardFooter}>
                  <Text style={styles.subTitle}>Inventory</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Card>
          <Text style={styles.menu}>Transactions Summary</Text>
          <TouchableOpacity onPress={this.transaction}>
            <LineChart
              data={{
                labels: [
                  'Januari',
                  'Februari',
                  'Maret',
                  'April',
                  'Mei',
                  'Juni',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 200,
                      Math.random() * 300,
                      Math.random() * 400,
                      Math.random() * 200,
                      Math.random() * 300,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50} // from react-native
              height={220}
              yAxisLabel={'Rp'}
              chartConfig={{
                backgroundColor: '#92ddea',
                backgroundGradientFrom: '#92ddea',
                backgroundGradientTo: '#92ddea',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 1,
                borderRadius: 10,
                alignSelf: 'center',
                paddingBottom: 20,
              }}
            />
          </TouchableOpacity>
        </Card>
        <Card>
          <View>
            <Text style={styles.summary}>Stock Summary</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.summary}>
              <ImageBackground
                source={require('../../../assets/images/summary.jpg')}
                style={styles.image}></ImageBackground>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

export default HomeScreen;
