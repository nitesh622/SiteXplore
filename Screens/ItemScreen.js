import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ItemScreen = ({navigation, route}) => {
    const data = route?.params?.data;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
            <ScrollView style={{flex: 1, padding: 16}}>
                <View>
                    <Image
                        source={{
                            uri: ('photo' in data) ? data?.photo?.images?.large?.url
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
                        }} 
                        style={{width: '100%', height: 288, resizeMode: 'cover', borderRadius: 15}}
                    />

                    <View style={{position: 'absolute', flexDirection: 'row', left: 0, right: 0, top: 20, justifyContent: 'space-between', paddingHorizontal: 24}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Discover")}
                            style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 6}}
                        >
                            <FontAwesome5 name="chevron-left" size={24} color="#06B2BE"/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#06B2BE', borderRadius: 6}}
                        >
                            <FontAwesome5 name="heartbeat" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={{position: 'absolute', flexDirection: 'row', left: 0, right: 0, bottom: 20, justifyContent: 'space-between', paddingHorizontal: 24}}>
                        <View style={{flexDirection: 'row', marginLeft: 8, alignItems: 'center'}}>
                            <Text style={{fontSize: 32, fontWeight: 'bold', color: '#F5F5F5'}}>
                                {data?.price}
                            </Text>
                        </View>

                        <View style={{paddingHorizontal: 8, paddingVertical: 4, height: '80%',borderRadius: 6, backgroundColor: '#B2DFDB'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#0B646B'}}>{(data?.is_closed)?'Closed Now':'Open Now'}</Text>
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 24}}>
                    <Text style={{color: '#428288', fontWeight: 'bold', fontSize: 24}}>
                        {data?.name}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 8}}>
                        <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
                        <Text style={{color: '#8C9EA6', fontSize: 20, fontWeight: 'bold', marginLeft: 5}}>
                            {data?.location_string}
                        </Text>
                    </View>
                </View>

                <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {
                        data?.rating && (
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                                <View style={{width: 42, height: 42, borderRadius: 10, backgroundColor: '#FFCDD2', alignItems: 'center', justifyContent: 'center', marginRight: 5}}>
                                    <FontAwesome name="star" size={24} color="#D58574" />
                                </View>
                                <View>
                                    <Text style={{color: '#515151', fontWeight: 'bold'}}>{data?.rating}</Text>
                                    <Text style={{color: '#515151', fontWeight: 'bold'}}>{"Ratings"}</Text>
                                </View>
                            </View>
                        )
                    }

                    {data?.price_level && (
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                        <View style={{width: 42, height: 42, borderRadius: 10, backgroundColor: '#FFCDD2', alignItems: 'center', justifyContent: 'center', marginRight: 5}}>
                            <MaterialIcons name="attach-money" size={24} color="black" />
                        </View>
                        <View>
                            <Text style={{color: '#515151', fontWeight: 'bold'}}>{data?.price}</Text>
                            <Text style={{color: '#515151', fontWeight: 'bold'}}>{"Price Level"}</Text>
                        </View>
                        </View>
                    )}

                    {data?.bearing && (
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                        <View style={{width: 42, height: 42, borderRadius: 10, backgroundColor: '#FFCDD2', alignItems: 'center', justifyContent: 'center', marginRight: 5}}>
                            <FontAwesome5 name="map-signs" size={24} color="black" />
                        </View>
                        <View>
                            <Text style={{color: '#515151', textTransform: 'capitalize', fontWeight: 'bold'}}>
                            {data?.bearing}
                            </Text>
                            <Text style={{color: '#515151', fontWeight: 'bold'}}>{"Bearing"}</Text>
                        </View>
                        </View>
                    )}
                </View>

                {data?.description && (
                    <Text style={{marginTop: 16, letterSpacing: 0.4, fontSize: 16, fontWeight: '600', color: '#97A6AF'}}>
                        {data?.description}
                    </Text>
                )}

                {data?.cuisine && (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 16, flexWrap: 'wrap', gap: 10}}>
                        {data?.cuisine.map((n) => (
                            <TouchableOpacity
                                key={n.key}
                                style={{paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#95fa98'}}
                            >
                                <Text>{n.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={{marginTop: 16, backgroundColor: '#F5F5F5', borderRadius: 15, padding: 10, marginBottom: 40}}>
                    {data?.phone && (
                        <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginBottom: 10}}>
                            <FontAwesome name="phone" size={22} color="#428288"/>
                            <Text style={{fontSize: 16, lineHeight: 28, marginLeft: 20}}>{data?.phone}</Text>
                        </View>
                    )}
                    {data?.email && (
                        <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginBottom: 10}}>
                            <FontAwesome name="envelope" size={22} color="#428288" />
                            <Text style={{fontSize: 16, lineHeight: 28, marginLeft: 20}}>{data?.email}</Text>
                        </View>
                    )}
                    {data?.address && (
                        <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginBottom: 10}}>
                            <FontAwesome name="map-pin" size={22} color="#428288" />
                            <Text style={{fontSize: 16, lineHeight: 28, marginLeft: 20}}>{data?.address}</Text>
                        </View>
                    )}

                    <View style={{marginTop: 16, padding: 8, borderRadius: 8, backgroundColor: '#06B2BE', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                        <Text style={{fontSize:24, lineHeight: 36, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, color: '#F5F5F5'}}>{"Book Now"}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ItemScreen

const styles = StyleSheet.create({})