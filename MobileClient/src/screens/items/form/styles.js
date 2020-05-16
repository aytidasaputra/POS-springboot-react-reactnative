import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#be9ddf',
    paddingLeft: 0,
    alignSelf: 'center',
  },
  error: {
    paddingHorizontal: 12,
    color: '#f00',
  },
  form: {
    borderRadius: 20,
    paddingHorizontal: 2,
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
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 50,
  },
});

export default styles;
