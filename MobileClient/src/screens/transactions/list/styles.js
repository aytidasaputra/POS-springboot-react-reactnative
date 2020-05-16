import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
  },
  hiddenItem: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  deleteButton: {
    width: 55,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#92ddea',
  },
  card: {
    width: 358,
    height: 100,
  },
  body: {
    backgroundColor: '#92ddea',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginTop: 18,
  },
  textCard: {
    color: '#fff',
  },
  bodyAmount: {
    marginTop: 18,
  },
  chart: {
    fontSize: 40,
  },
});

export default styles;
