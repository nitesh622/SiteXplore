import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';


const HomePage = () => {
    const navigation = useNavigation();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            <View style={{height: '100%', width: '100%'}}>
                <View style={{flexDirection: 'row', margin: 20, alignItems: 'center'}}>
                    <View style={{height: 65, width: 65, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                        <Text style={{fontSize: 26, color: '#00BCC9', fontWeight: 'bold'}}>Site</Text>
                    </View>
                    <Text style={{fontSize: 30, color: '#2A2B4B', fontWeight: 'bold', marginLeft: 5}}>Xplore</Text>
                </View>

                <View style={{marginHorizontal: 20}}>
                    <Text style={{fontSize: 42, color: '#3C6072'}}>{'Enjoy the trip with'}</Text>
                    <Text style={{fontSize: 38, color: '#00BCC9', fontWeight: 'bold', marginTop: 5}}>{'Good Moments'}</Text>
                    <Text style={{color: '#3C6072', marginTop: 10, lineHeight: 20}}>
                        {'Life is short and the world is wide.\nWe live in a wonderful world that is full of beauty, \ncharm and adventure.'}
                    </Text>
                </View>

                <View style={{height: 350, width: 350, backgroundColor: '#00BCC9', position: 'absolute', borderRadius: 300, bottom: 150, left: 170}}></View>
                <View style={{height: 350, width: 350, backgroundColor: '#E99265', position: 'absolute', borderRadius: 300, bottom: -100, right: 170}}></View>

                <View style={{position: 'absolute', bottom: -520, right: -370}}>
                    <Animatable.Image 
                        animation='fadeInUp'
                        easing='ease-in-out'
                        source={require('../assets/travellingman.png')} 
                        style={{height: 1100, width: 1100, resizeMode: 'contain'}}
                    />
                </View>

                <TouchableOpacity 
                    style={{position: 'absolute', bottom: 170, right: 120, borderWidth: 2, borderColor: '#00adb9', padding: 2, borderRadius: 25}}
                    onPress={()=>{
                        navigation.navigate('Discover')
                        // searchLocation();
                    }}
                >
                    <Animatable.View
                        animation='pulse'
                        easing='ease-in-out'
                        iterationCount={'infinite'}
                        style={{borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00BCC9'}}
                    >
                        <Text style={{fontSize: 26, color: 'white', fontWeight: 'bold', paddingHorizontal: 15, paddingVertical: 5}}>{'Explore'}</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({})