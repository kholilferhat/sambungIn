import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Pagination from "./Pagination";
// import image1 from '../../assets/PromoCard/AAYQAgSuAAgAAQAAAAAAACnZ-D2hlcNzRqqPRb5a8tlJcA.png'
// import image2 from '../../assets/PromoCard/AAYQAgSuAAgAAQAAAAAAACuOrgSfJBxATpCXbyGcf68zHA'
// import image3 from '../../assets/AAYQAgSuAAgAAQAAAAAAACwog6StkzhzSlK17m4iY5d_Xg'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function bannerCard({ item }) {
    // console.log('====================================');
    // console.log(item);
    // console.log('====================================');
    return (
        // <ScrollView
        //     horizontal={true}
        //     snapToAlignment="center"
        //     pagingEnabled={true}
        //     showsHorizontalScrollIndicator={false}
        //     style={{ overflow: 'hidden' }}
        // >
        // <View style={{ flex: 1 }}>

        //YANG INI!!!!
        <View style={promoStyles.container
        }>
            <View style={promoStyles.content
            }>

                <Image source={item.image}
                    resizeMode="cover"
                    style={promoStyles.image}
                />
                <View style={promoStyles.text}>
                    <Text style={promoStyles.text}>{item.text}</Text>
                </View>
            </View>
        </View>




        // <ScrollView
        // horizontal={true}
        // snapToAlignment="center"
        // pagingEnabled={true}
        // showsHorizontalScrollIndicator={false}
        // style={{ overflow: 'hidden' }}
        // >

        //     <View style={bannerStyles.container}>

        //         <View style={bannerStyles.content}>
        //             <Image
        //                 source={require('../../assets/PromoCard/cewe-wfh.png')}
        //                 resizeMode="contain"
        //                 style={bannerStyles.image}
        //             />
        //             <Text style={bannerStyles.text}>Get notified when new jobs match your preferred title and location.</Text>
        //         </View>

        //     </View>
        //     <View style={bannerStyles.container}>

        //         <View style={bannerStyles.content}>
        //             <Image
        //                 source={require('../../assets/PromoCard/co-ce-berbincang.png')}
        //                 resizeMode="contain"
        //                 style={bannerStyles.image}
        //             />
        //             <Text style={bannerStyles.text}>Get notified when new jobs match your preferred title and location.</Text>
        //         </View>
        //     </View>
        //     <View style={bannerStyles.container}>
        //         <View style={bannerStyles.content}>
        //             <Image
        //                 source={require('../../assets/PromoCard/ngurus-anak.png')}
        //                 resizeMode="contain"
        //                 style={bannerStyles.image}
        //             />
        //             <Text style={bannerStyles.text}>Get notified when new jobs match your preferred title and location.</Text>
        //         </View>
        //     </View>
        //     {/* <Pagination style={bannerStyles.pagination}/> */}
        // </ScrollView>

    )
}

// const bannerStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignContent: 'center',
//         // borderWidth: 1,
//         width: windowWidth * 1,
//         // top: 0

//         // height:windowHeight * 0.5

//         // height: 252
//         // height: windowHeight * 0.4

//     },
//     content: {
//         // width: windowWidth * 0.5,
//         // top: 0,
//         margin: 16,
//         borderWidth: 1,
//         borderColor: '#EAEAEA',
//         height: windowHeight * 0.3,
//         borderRadius: 8,
//     },

//     image: {
//         // height: 147
//         width: '100%',
//         // overflow:"hidden"

//         borderTopStartRadius: 8,
//         borderTopEndRadius: 8,


//         // top:0
//     },
//     text: {
//         margin: 8,
//         // lineHeight: ,
//         fontSize: 18,
//         color: '#333'
//     },
//     // pagination:{

//     // }
// })

const promoStyles = StyleSheet.create({
    container: {
        // width: windowWidth * 1
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth: 1,
        width: windowWidth * 1,
        // top: 0
        // borderWidth:1
        // height:windowHeight * 0.5

        // height: 252
        // height: windowHeight * 0.4
        
    },
    content: {
        // width: windowWidth * 0.5,
        // top: 0,
        margin: 16,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        // height: windowHeight * 0.3,
        borderRadius: 8,
        
    },
    image: {
        // height: 147
        width: '100%',
        // overflow:"hidden"

        borderTopStartRadius: 7,
        borderTopEndRadius: 7,


        // top:0
    },
    text: {
        margin: 8,
        // lineHeight: ,
        fontSize: 14,
        color: '#333'
    },

})