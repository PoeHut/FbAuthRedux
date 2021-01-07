import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import {selectLibrary}  from '../reducers/LibraryReducer'

const ListItem = ({library, selectedItem, onSelectLibrary, expanded}) => {

    const renderDescription = () => {
        return(
            <View style={styles.expandStyle}>
                <Text>{library.description}</Text>
            </View>
        )
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => onSelectLibrary(library.id)}>
                <View style={styles.listStyle}>
                    <Text style={{fontSize: 18}}>{library.title}</Text>
                </View>
            </TouchableWithoutFeedback>
            {expanded ? renderDescription() : null}
        </View>
    )
}

const mapStateToProps = (state, componentProps) => {
    const expanded = componentProps.library.id === state.selectedItem;
    
    return {
        expanded: expanded
    }
}

const mapDispatchToProps = dispatch => (
    { 
        onSelectLibrary: (id) => dispatch(selectLibrary(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps) (ListItem)

const styles = StyleSheet.create({
    listStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#BCC6CC',
        padding: 10
    },
    expandStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#BCC6CC',
        padding: 10
    }
})
