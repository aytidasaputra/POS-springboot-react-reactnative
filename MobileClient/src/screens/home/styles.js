import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 25,
    padding: 15,
  },
  slider: {
    paddingTop: 15,
  },
  menu: {
    fontSize: 25,
    fontFamily: 'sans-serif',
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  listContainer: {
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: '#FFFFFF',
  },
  icon: {
    height: 30,
    width: 30,
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
    paddingHorizontal: 20,
  },
  summary: {
    fontSize: 25,
    fontFamily: 'sans-serif',
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
  },
});

export default styles;
