import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const PlaceDetailsScreen = (props) => {
    return (
        <View>
            <Text>PlaceDetailScreen</Text>
        </View>
    );
}

PlaceDetailsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({

})

export default PlaceDetailsScreen;
