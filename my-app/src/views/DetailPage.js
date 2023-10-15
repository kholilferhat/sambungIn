import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_JOB_BY_ID } from "../query";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { MaterialIcons } from '@expo/vector-icons';

export default function DetailPage({ jobId }) {

  const { data, loading, error } = useQuery(GET_JOB_BY_ID, {
    variables: {
      jobDetailId: jobId
    }
  })

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

  const job = data.jobDetail

  return (
    < View style={detailStyles.container}>
      <View style={detailStyles.lineContainer}>
        <View style={detailStyles.line} />
      </View>
      <View style={detailStyles.contentContainer}>
        <Text style={detailStyles.title}>{job.title}</Text>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'left' }}>
          <View style={detailStyles.imageContainer}>
            <Image source={{ uri: `${job.Company.companyLogo}` }}
              resizeMode="cover"
              style={detailStyles.image}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={detailStyles.h3}>{job.Company.name}</Text>
            <Text style={detailStyles.h3}>{job.Company.email}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", gap: 8 }}>
          <Text>{job.description}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", gap: 8 }}>
          <MaterialIcons name="work" size={24} color="black" />
          <Text style={detailStyles.h3}>{job.jobType}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", gap: 8 }}>
          <Text style={[detailStyles.h3, { fontWeight: 'bold' }]}>Skills:</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: "center", gap: 8 }}>
          {job.Skills &&
            job.Skills.map((el, index) => {
              return (
                <View key={index}>
                  <View style={{ flexWrap: "wrap", margin: 2 }}>
                    <Text style={detailStyles.skilltext}>{el.name}</Text>
                  </View>
                  <View style={{ flexWrap: "wrap", margin: 2, width: 120 }}>
                    <Text style={detailStyles.skilltext}>{el.level}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    </ View>

  );
}

const detailStyles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: 'white',
  },
  bottomSheetContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    width: windowWidth,
    height: windowHeight,
    top: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lineContainer: {
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA'
  },
  line: {
    width: 70,
    height: 6,
    backgroundColor: 'grey',
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 17,
  },
  greyBackground: {
    backgroundColor: 'grey',
    opacity: 0.5,
    zIndex: 0,
    height: windowHeight,
  },
  contentContainer: {
    margin: 16,
    gap: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  image: {
    width: 52,
    height: 52,
    backgroundColor: 'white'
  },
  imageContainer: {
    // flex: 1
  },
  h3: {
    fontSize: 16
  },
  skillsContainer: {

  },
  skilltext: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    width: 150,
    justifyContent: 'center'
  }
})