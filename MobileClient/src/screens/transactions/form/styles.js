import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 20,
    marginLeft: 120,
    marginRight: 120,
    alignSelf: 'center',
    backgroundColor: '#be9ddf',
  },
  error: {
    paddingHorizontal: 12,
    color: '#f00',
  },
  cardForm: {
    justifyContent: 'center',
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 235,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  cardImage: {
    marginTop: 18,
  },
});

export default styles;
