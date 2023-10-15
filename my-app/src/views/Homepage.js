import { Button, ScrollView, Text, View, Dimensions, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView } from "react-native";
import { styles } from "../utilities/StyleSheet";
import JobCard from "../components/JobCard";
import BannerCard from "../components/BannerCard";
import { StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../components/Slider";
import { FlatList } from "react-native-gesture-handler";
import { useCallback, useEffect, useRef, useState } from "react";
import TopNav from "../components/TopNav";
import { gql, useQuery } from '@apollo/client';
import { GET_JOBS } from "../query";
import DetailPage from "./DetailPage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"


const { width, height } = Dimensions.get('screen')



export default function HomePage({ navigation }) {

  // const [jobs, setJobs] = useState([])

  const SheetRef = useRef < BottomSheet > (null)
  const [isOpen, setIsOpen] = useState(true)
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const snapPoints = [1, "60", "90"]

  // const insets = useSafeAreaInsets();


  const { data, loading, error } = useQuery(GET_JOBS)
  // console.log(data, loading, error);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Error...</Text>
      </View>
    )
  }

  const jobs = data.jobs

  // async function fetchJobs() {
  //   try {
  //     const response = await fetch("https://admin.spreadthejoy.id/cust/jobs");
  //     const data = await response.json()
  //     // console.log(movies);
  //     // console.log(data);
  //     setJobs(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchJobs()
  // }, [])



  return (

    <SafeAreaView style={homeStyles.mainContainer}>
      <View style={homeStyles.greyBackground} />


      <View style={homeStyles.jobContainer}>
        {/* <TouchableOpacity */}
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={homeStyles.heroContainer}>
              <Slider />
            </View>
          }
          renderItem={({ item, index }) =>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Detail')
                // console.log('pressed');
                // <DetailPage/>
                // navigation.navigate('Detail', { jobId: item.id });
                // console.log(item, '<<onpress');
                setSelectedJobId(item.id)
                setIsBottomSheetVisible(true);
              }}
            >
              <JobCard job={item} index={index} />
            </TouchableOpacity>

          }
        />
        {/* </TouchableWithoutFeedback> */}
      </View>

      {/* ----batas---- */}
      {/* <View style={homeStyles.greyBackground}/> */}
      {/* <DetailPage /> */}
      {/* </View> */}

      {/* <BottomSheet
        // ref={SheetRef}
        snapPoints={snapPoints}
      >
        <BottomSheetView>
          <DetailPage />
        </BottomSheetView>
      </BottomSheet> */}

      

      <BottomSheet
        index={isBottomSheetVisible ? 1 : 0} 
        snapPoints={snapPoints}
        // enablePanDownToClose={true}
        handleIndicatorStyle={{ display: 'none' }}
        onChange={(index) => {
          // Close the bottom sheet when it's fully closed
          console.log(index);
          if (index === 0) {
            setIsBottomSheetVisible(false);
          }
        }}
        
        style={isBottomSheetVisible ? homeStyles.shadow : ''}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      // )}
      // backdropComponent={}
      // backdropComponent={BottomSheetBackdrop}
      >
        <BottomSheetView>
          <DetailPage jobId={selectedJobId} />
        </BottomSheetView>
      </BottomSheet>


    </SafeAreaView>



  );
}

// onPress={() => { navigation.navigate('Detail') }}
// title="Detail"

const homeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    height,


  },
  heroContainer: {
    // flex: 1/4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    marginBottom: 8,
    // height,
    // flex: 0.4,
    backgroundColor: 'white'
  },
  jobContainer: {
    // flex:
    // marginTop: 8,
    backgroundColor: '#E8E5DF'

  },
  greyBackground: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'grey',
    zIndex: 2,
    height,
    top: 0
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4.22,

    elevation: 3,
  }
  // greyBackground: {
  //   position: 'absolute',
  //   // flex:1,
  //   backgroundColor: 'grey',
  //   // opacity: 0.5,
  //   zIndex: 2,
  //   height,
  // }
})