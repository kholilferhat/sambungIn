import { Button, Text, View } from "react-native";
import { styles } from "../utilities/StyleSheet";



export default function HomePage({navigation}) {
    return (
      <View style={styles.container}>
        <Text>ini home</Text>
        <Button 
        onPress={() => {navigation.navigate('Detail')}}
        title="Detail"
      
        />
      </View>
    );
  }