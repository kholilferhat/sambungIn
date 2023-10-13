import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React from 'react'

const{width} = Dimensions.get('screen')

const Pagination = ({ data, scrollX, index }) => {
    return (
        <View style={styles.container}>
            {
                data.map((_, idx) => {
                    const inputRange = [(idx-1) * width, idx * width, (idx +1) * width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: 'clamp'
                    })

                   return  <Animated.View
                        key={idx.toString()}
                        style={[styles.dot, idx === index && styles.dotActive, {width: dotWidth}]}
                        
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