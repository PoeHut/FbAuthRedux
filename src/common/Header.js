import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Header = ({title}) => {
    const navigation = useNavigation();

    const clearStorage = async () => {
        try {
          await AsyncStorage.clear()
        } catch (e) {
          console.log('Failed to clear the async storage.')
        }
      }

    const logOut = () => {
        auth()
        .signOut()
        .then(() => {
            clearStorage()
            navigation.navigate("Login")
        });
    }

    return (
        <View style={styles.header}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 18}}>{title}</Text>
                </View>
                
                <View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => logOut()}>
                        <Text style={{color: '#FFF'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#6D7B8D',
        marginVertical: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5
    },

    buttonStyle: {
        backgroundColor: '#0C090A',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3
    }
})
