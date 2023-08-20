import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Switch } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {RAPIDAPI_KEY} from '@env';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ItemCard from '../components/ItemCard';
import Spinner from 'react-native-loading-spinner-overlay';
 
const Discover = () => {
    const navigation = useNavigation();
    const [placeName, setPlaceName] = useState('');
    const [tempPlaceName, setTempPlaceName] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [finalPlace, setFinalPlace] = useState({
        fullName: '',
        lat: 0.0,
        long: 0.0
    });
    const [selectedType, setSelectedType] = useState(2);
    const [showLoader, setShowLoader] = useState(false);
    const [showAutoCompLoader, setShowAutoCompLoader] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [placesData, setPlacesData] = useState([]);
    const [hotelsData, setHotelsData] = useState([]);

    useEffect(() => {
        if(placeName == '') return;
        autoCompleteApi();

    }, [placeName])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);


    const getRestaurants = async (placeDetails) => {
        if(placeDetails.fullName == '') {
            setShowLoader(false);
            return;
        }
        setShowLoader(true);
        const url = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${placeDetails.lat}&longitude=${placeDetails.long}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setRestaurantsData(result.data);
            setShowLoader(false);
            
        } catch (error) {
            setShowLoader(false);
            console.error(error);
        }
    }

    const getPlaces = async (placeDetails) => {
        if(placeDetails.fullName == '') {
            setShowLoader(false);
            return;
        }
        setShowLoader(true);
        // console.log(placeDetails);
        const url = `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${placeDetails.long}&latitude=${placeDetails.lat}&lang=en_US`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setPlacesData(result.data)
            setShowLoader(false);
        } catch (error) {
            console.error(error);
            setShowLoader(false);
        }
    }

    const getHotels = async (placeDetails) => {
        // console.log(placeDetails);
        if(placeDetails.fullName == '') {
            setShowLoader(false);
            return;
        }
        setShowLoader(true);
        const url = `https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng?latitude=${placeDetails.lat}&longitude=${placeDetails.long}&limit=30`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setHotelsData(result.data);
            setShowLoader(false);
        } catch (error) {
            console.error(error);
            setShowLoader(false);
        }
    }

    const searchLocation = async () => {
        if(tempPlaceName == '') return;
        setShowLoader(true);
        setSuggestions([]);
        const url = `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${tempPlaceName}&language=en`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const placeDetails = {
                fullName: result?.results[0]?.address,
                lat: result?.results[0]?.location?.lat,
                long: result?.results[0]?.location?.lng,
            }
            setFinalPlace(placeDetails);

            await getHotels(placeDetails);
            await getPlaces(placeDetails);
            await getRestaurants(placeDetails);

        } catch (error) {
            setShowLoader(false);
            console.error(error);
        }
    }

    const autoCompleteApi = async () => {
        if(!isEnabled) return;

        setShowAutoCompLoader(true);
        const url = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${placeName}&lang=en_US&units=km`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            let arr = result?.data?.Typeahead_autocomplete?.results;
            let newSuggArr = [];
            arr.map((res) => {
                if('detailsV2' in res) {
                    // console.log(res);
                    const newSugg = {
                        fullName: res.detailsV2.names.name + ', ' + res.detailsV2.names.longOnlyHierarchyTypeaheadV2,
                        lat: ('geocode' in res.detailsV2 && res.detailsV2.geocode != null)
                        ?('latitude' in res.detailsV2.geocode)
                        ?res.detailsV2.geocode.latitude
                        :null:null,
                        long: ('geocode' in res.detailsV2 && res.detailsV2.geocode != null)
                        ?('longitude' in res.detailsV2.geocode)
                        ?res.detailsV2.geocode.longitude
                        :null:null,
                    }
                    
                    if(newSugg.lat != null && newSugg.long != null) {
                        newSuggArr.push(newSugg);
                    }
                }
            });

            setSuggestions(newSuggArr);
            setShowAutoCompLoader(false);
            // console.log(suggestions);
        } catch (error) {
            setShowAutoCompLoader(false);
            console.error(error);
        }
    }

    return (
        <SafeAreaView>
            <Spinner
                visible={showLoader}
                size={50}
            />
            <View style={{height: '100%', width: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20}}>
                    <View>
                        <Text style={{fontSize: 40, color: '#0B646B', fontWeight: 'bold'}}>{'Discover'}</Text>
                        <Text style={{fontSize: 34, color: '#527283'}}>{'the beauty today'}</Text>
                    </View>
                    <Image source={require('../assets/avatar.png')} style={{height: 50, width: 50, borderRadius: 15}}/>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10}}>
                    <Text style={{fontSize: 18, color: '#A0C4C7'}}>{'Autocomplete'}</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#0B646B' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {setIsEnabled(prevValue => !prevValue)}}
                        value={isEnabled}
                    />
                </View>

                <View 
                    style={{
                        marginHorizontal: 16, 
                        marginVertical: 4, 
                        borderRadius: 15, 
                        backgroundColor: 'white',
                        // borderWidth: 1,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <TextInput
                        onSubmitEditing={()=>{searchLocation()}}
                        placeholder='search place'
                        onChangeText={(text) => {
                            setPlaceName(text)
                            setTempPlaceName(text)
                        }}
                        value={tempPlaceName}
                        style={{width: '100%', paddingHorizontal: 16}}
                    />
                    
                    {
                        suggestions.length > 0
                        ? 
                        <View 
                            style={{
                                width: '100%',
                                paddingHorizontal: 16, 
                                paddingBottom: 10, 
                                position: 'absolute', 
                                backgroundColor: 'white', 
                                marginTop: 38,
                                borderBottomLeftRadius: 15, 
                                borderBottomEndRadius: 15, 
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        > 
                            {
                                suggestions.map((sugg) => {
                                    return (
                                        <TouchableOpacity
                                            style={{paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#E0E0E0'}}
                                            onPress={() => {
                                                setTempPlaceName(sugg.fullName)
                                                setFinalPlace(sugg)
                                            }}
                                        >
                                            <Text style={{fontSize: 16, color: 'black'}}>{sugg.fullName}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                            <ActivityIndicator 
                                style={{position: 'absolute', right: '50%', top: '50%'}}
                                animating={showAutoCompLoader}
                                size={'large'}
                            />
                        </View>
                        : null
                    }
                </View>
                
                <ScrollView style={{zIndex: -1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20}}>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity 
                                style={{padding: 10, borderRadius: 50, backgroundColor: selectedType==0?'#e8e8e8':null}} 
                                onPress={() => {
                                    setSelectedType(0);
                                }}
                            >
                                <Image source={require('../assets/hotel.png')} style={{height: 80, width: 80}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20, color: '#00BCC9', fontWeight: 'bold'}}>{'Hotels'}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                style={{padding: 10, borderRadius: 50, backgroundColor: selectedType==1?'#e8e8e8':null}} 
                                onPress={() => {
                                    setSelectedType(1);
                                }}
                            >
                                <Image source={require('../assets/attraction.png')} style={{height: 80, width: 80}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20, color: '#00BCC9', fontWeight: 'bold'}}>{'Attractions'}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                                style={{padding: 10, borderRadius: 50, backgroundColor: selectedType==2?'#e8e8e8':null}} 
                                onPress={() => {
                                    setSelectedType(2);
                                }}
                            >
                                <Image source={require('../assets/restaurants.png')} style={{height: 80, width: 80}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20, color: '#00BCC9', fontWeight: 'bold'}}>{'Restaurants'}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 30}}>
                        <Text style={{fontSize: 28, fontWeight: 'bold', color: '#2C7379'}}>Top Tips</Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#A0C4C7', marginRight: 5}}>Explore</Text>
                            <FontAwesome name="long-arrow-right" size={24} color={'#A0C4C7'}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly'}}>
                        {
                            (selectedType==0)
                            ? hotelsData.map((data) => {
                                return(<ItemCard data={data}/>);
                            })
                            : (selectedType==1)
                            ? placesData.map((data) => {
                                return(<ItemCard data={data}/>);
                            })
                            : (selectedType==2)
                            ? restaurantsData.map((data) => {
                                return(<ItemCard data={data}/>);
                            })
                            : <></>
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Discover

const styles = StyleSheet.create({})