import { Button, ScrollView, Text, View, Dimensions } from "react-native";
import { styles } from "../utilities/StyleSheet";
import JobCard from "../components/JobCard";
import BannerCard from "../components/BannerCard";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../components/Slider";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

const { width, height } = Dimensions.get('screen')


export default function HomePage({ navigation }) {

  const [jobs, setJobs] = useState([])

  async function fetchJobs() {
    try {
      const response = await fetch("https://admin.spreadthejoy.id/cust/jobs");
      const data = await response.json()
      // console.log(movies);
      setJobs(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // console.log('====================================');
  // console.log(jobs.Company.companyLogo, '<<<<<<');
  // console.log('====================================');

  // useEffect(() => {
  //   fetch('https://admin.spreadthejoy.id/cust/jobs')
  //   .then((res) => {
  //     setJobs(res.json())
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // },[])

  return (
    // <View style={styles.container}>
    // <View style={styles.heroContainer}>
    //   <Text>ini home</Text>
    //   <Button
    //     onPress={() => { navigation.navigate('Detail') }}
    //     title="Detail"
    //   />
    // </View>

    //yang terakhir

    // <ScrollView
    //   style={styles.scrollContainer}
    // // contentContainerStyle={styles.cardContainer}
    // >
    //   <ScrollView
    //     style={styles.heroContainer}
    //     contentContainerStyle={styles.bannerContainer}
    //     nestedScrollEnabled={true}
    //   >
    //     <View style={styles.bannerCard}>
    //       <BannerCard/>
    //     </View>

    //   </ScrollView>
    //   <JobCard style={styles.cardContainer} />
    // </ScrollView>
    // </View>


    <ScrollView style={homeStyles.mainContainer}>
      <View style={homeStyles.heroContainer}>
        <Slider />
      </View>
      <View style={homeStyles.jobContainer}>
        {/* <FlatList /> */}
        <FlatList
          data={jobs}
          renderItem={({ item }) =>
            <JobCard job={item} />
            // <BannerCard item={item}
            // />
          } />

      </View>
    </ScrollView>



  );
}

// onPress={() => { navigation.navigate('Detail') }}
// title="Detail"

const homeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E8E5DF",
    height,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 343,
    // height,
    // flex: 0.4,
    backgroundColor: 'white'
  },
  jobContainer: {
    // flex:
    marginTop: 8,

  }
})