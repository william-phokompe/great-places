import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const NewPlaceScreen = (props) => {
    return (
        <View>
            <Text>Places list screen</Text>
        </View>
    );
}

NewPlaceScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Add Place'
    }
}

const styles = StyleSheet.create({

})

export default NewPlaceScreen;
