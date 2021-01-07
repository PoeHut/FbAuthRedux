import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = ({size = null}) => {
    return (
        <View>
            <ActivityIndicator size={size ?? 'large'} color="#0000ff" />
        </View>
    )
}

export default Spinner
