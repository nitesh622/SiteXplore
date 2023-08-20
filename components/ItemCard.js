import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ItemCard = (props) => {
    const navigation = useNavigation();
    const data = props?.data;
    return (
        <TouchableOpacity 
            style={{
                width: '45%', 
                padding: 10, 
                borderRadius: 7, 
                marginBottom: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.35,
                shadowRadius: 4,
                elevation: 5,
                backgroundColor:'white'
            }}

            onPress={() => {navigation.navigate('ItemScreen', {data: data})}}
        >
            <Image
                source={{uri: ('photo' in data) ? data?.photo?.images?.medium?.url
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
                }} 
                style={{height: 160, width: '100%', borderRadius: 8, resizeMode: 'cover'}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#428288', marginVertical: 5}}>
                {('name' in data) ? (data.name).length > 14 ? `${(data.name).slice(0, 14)}..` : data.name : ''}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <FontAwesome name="map-marker" size={20} color="#8597A2" />
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#428288', marginLeft: 4}}>
                    {('location_string' in data) ? (data.location_string).length > 18 ? `${(data.location_string).slice(0, 18)}..` : data.location_string : ''}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCard

const styles = StyleSheet.create({})