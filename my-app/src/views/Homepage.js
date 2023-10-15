import { Text, View, Dimensions, ActivityIndicator, SafeAreaView } from "react-native";
import JobCard from "../components/JobCard";
import { StyleSheet } from "react-native";
import Slider from "../components/Slider";
import { FlatList, RefreshControl, TouchableHighlight } from "react-native-gesture-handler";
import { useCallback, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_JOBS } from "../query";
import DetailPage from "./DetailPage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"


const { height } = Dimensions.get('screen')



export default function HomePage() {

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const snapPoints = [1, "55", "90"]

  const { data, loading, error } = useQuery(GET_JOBS)
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

  return (

    <SafeAreaView style={homeStyles.mainContainer}>
      <View style={homeStyles.greyBackground} />
      <View style={homeStyles.jobContainer}>
        <FlatList
          data={jobs}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={homeStyles.heroContainer}>
              <Slider />
            </View>
          }
          renderItem={({ item, index }) =>
            <TouchableHighlight
              onPress={() => {
                setSelectedJobId(item.id)
                setIsBottomSheetVisible(true);
              }}
            >
              <JobCard job={item} index={index} />
            </TouchableHighlight>

          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <BottomSheet
        index={isBottomSheetVisible ? 1 : 0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: 'none' }}
        onChange={(index) => {
          if (index === 0) {
            setIsBottomSheetVisible(false);
          }
        }}

        style={isBottomSheetVisible ? homeStyles.shadow : ''}
      >
        <BottomSheetView>
          <DetailPage jobId={selectedJobId} />
        </BottomSheetView>
      </BottomSheet>


    </SafeAreaView>



  );
}

const homeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    height,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
    marginBottom: 8,
    backgroundColor: 'white'
  },
  jobContainer: {
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
})