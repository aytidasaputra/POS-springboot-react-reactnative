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
    height: 70,
    borderRadius: 10,
    backgroundColor: '#92ddea',
  },
  icon: {},
});

export default styles;
