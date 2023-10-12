import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  scrollContainer: {
    height: '100%',
    width: '100%',
    // margin: 20,
    alignSelf: 'center',
    // padding: 8,
    // borderWidth: 5,
    // borderRadius: 5,
    // borderColor: 'black',
    backgroundColor: 'pink'
  },
  heroContainer: {
    // flex: 1 / 3,
    // backgroundColor: '#3579B1',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
    
    backgroundColor: 'blue',
    width: '100%',
    height: 200,

  },
  bannerCard: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height:343,
    width:'100%',
    backgroundColor:'green'
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:343,
    width:'100%',
    backgroundColor:'yellow'
  },
  cardContainer: {
    flex: 1 / 6,
    backgroundColor: 'red',
    // width: '500',
    height: '200',
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightgrey',
    // paddingBottom: 50
  },

});