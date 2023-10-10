import { Button, ScrollView, Text, View } from "react-native";
import { styles } from "../utilities/StyleSheet";
import JobCard from "../components/JobCard";



export default function HomePage({ navigation }) {
  return (
    // <View style={styles.container}>
    // <View style={styles.heroContainer}>
    //   <Text>ini home</Text>
    //   <Button
    //     onPress={() => { navigation.navigate('Detail') }}
    //     title="Detail"
    //   />
    // </View>
    <ScrollView
      style={styles.scrollContainer}
    // contentContainerStyle={styles.cardContainer}
    >
      <ScrollView
        style={styles.heroContainer}
        contentContainerStyle={styles.bannerContainer}
        nestedScrollEnabled={true}
      >
        <View style={styles.bannerCard}>
          <Text>ini home</Text>
          <Button
            onPress={() => { navigation.navigate('Detail') }}
            title="Detail"
          />
        </View>
        <View style={styles.bannerCard}>
          <Text>ini home</Text>
          <Button
            onPress={() => { navigation.navigate('Detail') }}
            title="Detail"
          />
        </View>
      </ScrollView>
      <JobCard style={styles.cardContainer} />
    </ScrollView>
    // </View>
  );
}