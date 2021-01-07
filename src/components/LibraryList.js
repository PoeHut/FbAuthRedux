import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ListItem'

const LibraryList = props => {
    
    const renderItem = ({item}) => (
        <ListItem library = {item} />
    )

    return (
        <View>
            <FlatList
                data={props.libraries}
                keyExtractor= {library => library.title}
                renderItem={renderItem}
            />
        </View>
    )
}

const mapStateToProps = state => {
    return {libraries: state.library }
}

const LibraryRedux = connect(mapStateToProps) (LibraryList)

export default LibraryRedux