import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'

const Pagination = ({ data, scrollX, index }) => {
    return (
        <View style={styles.container}>
            {
                data.map((_, idx) => {
                   return  <Animated.View
                        key={idx.toString()}
                        style={[styles.dot, idx === index && styles.dotActive]}
                        
                        />

                })
            }
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        // backgroundColor: '#ccc',
        borderWidth:1,
        borderColor: '#666',
        marginHorizontal:3

    },
    dotActive: {
        backgroundColor: '#666'
    }
    ,container: {
        // position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
        // zIndex: 3
    }
})