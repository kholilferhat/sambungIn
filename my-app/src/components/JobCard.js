import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const JobCard = ({ job }) => {

    // console.log('====================================');
    // console.log(job.Company.companyLogo, '<<<');
    // console.log('====================================');

    return (
        <View style={styles.container}>
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
                <Text style={styles.description}>{job.User.username}</Text>
                <Text>{job.jobType}</Text>
            </View>
        </View>
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





