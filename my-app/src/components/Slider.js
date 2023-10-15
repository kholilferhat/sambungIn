import { ScrollView, StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import BannerCard from "../components/BannerCard";
import Pagination from './Pagination';

const data = [
    {
        image: require('../../assets/PromoCard/cewe-wfh.png'),
        text: 'Add your work experience and skills to show your strengths to recruiters.'
    },
    {
        image: require('../../assets/PromoCard/co-ce-berbincang.png'),
        text: 'Let recruiters know youre open to work and find your new job faster.'
    },
    {
        image: require('../../assets/PromoCard/ngurus-anak.png'),
        text: 'Get notified when new jobs match your preferred title and location.'
    },

]



const Slider = () => {
    const [index, setIndex] = useState(0)

    const scrollX = useRef(new Animated.Value(0)).current

    const handleOnViewableItems = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index)
    }).current


    const handleOnScroll = (event) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        }
                    }
                }
            ],
            {
                useNativeDriver: false
            }
        )(event)
    }

    return (
        <View >
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <BannerCard item={item}
                    />
                }
                horizontal={true}
                snapToAlignment="center"
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1,  }}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItems}
            />
            <Pagination data={data} scrollX={scrollX} index={index} />
        </View>
    )
}


export default Slider

const styles = StyleSheet.create({})