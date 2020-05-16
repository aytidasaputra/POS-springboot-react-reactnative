import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  center: {
    height: 40,
    width: 100,
    alignSelf: 'center',
    color: '#ffc100',
  },
  body: {},
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 30,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textShadowColor: '#92ddea',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textm: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 25,
    textShadowColor: '#92ddea',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  container: {
    backgroundColor: '#ffa5d8',
  },
  button: {
    width: 100,
    backgroundColor: '#92ddea',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    padding: 5,
  },
  textLogin: {
    color: 'white',
    fontSize: 25,
  },
  card: {
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 25,
  },
  cardHeader: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  cardItem: {
    backgroundColor: '#92ddea',
  },
  signup: {
    color: '#ffff',
    fontSize: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  email: {
    width: 300,
  },
  password: {
    width: 300,
    marginTop: 15,
  },
  formAlign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#92ddea',
    borderRadius: 20,
    margin: 10,
  },
  cardBody: {
    marginTop: 5,
  },
});

export default styles;
