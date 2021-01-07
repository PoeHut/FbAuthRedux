import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../common/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const [userData, setUserData] = useState(null)

    const readData = async () => {
        try {
          const data = await AsyncStorage.getItem('Auth')
                
          if (data) {
            setUserData(data)
          }
        } catch (e) {
          console.log('Failed to fetch the data from storage')
        }
      }
      
      useEffect(() => {
         readData()
      }, [])

    return (
        <View style={styles.container}>
            <Header title="My Profile" />
            <View>
                <Text>{ userData }</Text>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    }
})
