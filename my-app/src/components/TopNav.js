import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const icon = require('../../assets/icon.png')

const TopNav = () => {
    return (
        <View style={styles.container}>
            <View >
                <Image
                    src={require('../../assets/icon.png')}
                    style={styles.image}
                />
            </View>
            <Text style={{ color: 'black' }}>TopNav</Text>
        </View>
    )
}

export default TopNav

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 0.1,
        // paddingTop: 12,
        // paddingBottom: 12,
        // height: 95,
        // flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: '#eaeaea'

    },
    // image: {
    //     width: 14,
    //     height: 14
    // }
})