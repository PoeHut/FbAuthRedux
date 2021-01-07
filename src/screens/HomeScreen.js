import React, {useEffect}  from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'
import {useRoute} from '@react-navigation/native';
import LibraryRedux from '../components/LibraryList';
import Header from '../common/Header';

const HomeScreen = () => {
    const route = useRoute();
    
    const backAction = () => {
        if(route.name === "Home") {   
            BackHandler.exitApp()
        }
    }

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', backAction)
        
        //clean up
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [])
    
    return (
        <View style={styles.conatiner}>
            <Header title="Tech Stack" />     
            <LibraryRedux />            
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#FFF'
    },
})
