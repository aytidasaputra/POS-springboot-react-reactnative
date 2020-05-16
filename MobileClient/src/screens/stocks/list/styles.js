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
    paddingLeft: 50,
  },
  chart: {
    fontSize: 40,
  },
  nameStock: {
    marginTop: 5,
    backgroundColor: '#92ddea',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  textStock: {
    color: '#fff',
  },
  noteStock: {
    marginTop: 5,
  },
});

export default styles;
