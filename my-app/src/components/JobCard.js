import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const JobCard = ({ job, index }) => {

    // console.log('====================================');
    // console.log(job.Company.companyLogo, '<<<');
    // console.log('====================================');

    return (
        <MotiView style={styles.container}
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 200 }}
        >
            <View style={styles.imgContainer}>
                <Image
                    source={{ uri: `${job.Company.companyLogo}` }}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.description}>{job.Company.name}</Text>
                <Text style={styles.description}>{job.Company.email}</Text>
                <Text>{job.jobType}</Text>
            </View>
        </MotiView>
    )
}

export default JobCard

const styles = StyleSheet.create({
    container: {
        // marginTop: 8,
        padding: 8,
        flex: 1,
        backgroundColor: 'white',
        height: 127,
        flexDirection: 'row'
    },
    imgContainer: {
        flex: 0.2
    },
    contentContainer: {
        flex: 0.8,
        borderBottomWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'space-between',
        paddingBottom: 8
    },
    image: {
        borderRadius: 999,
        width: '75%',
        height: '50%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        // fontWeight: 'bold'
    },
})





