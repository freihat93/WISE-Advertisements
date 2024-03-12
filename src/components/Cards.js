import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, AsyncStorage, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Cards = ({ text, image, index, admin, date, users, refresh, now, profileId }) => {
    const [img, setImg] = useState('');

    useEffect(() => { setImg(users[0]) }, []);

    const remove = async (i) => {
        try {
            const value = await AsyncStorage.getItem('posters');
            if (value !== null)
                var arr = JSON.parse(value);
        } catch (error) { alert(error + '    11') }

        arr.splice(i, 1)

        try {
            await AsyncStorage.setItem('posters', JSON.stringify(arr));
            refresh();
        } catch (error) { alert(error + '   22') }
    }

    return (
        <View style={styles.card}>

            <View style={styles.topView}>
                {img === '' ? <Image style={styles.profile} source={require('../../assets/profile.png')} /> :
                    <Image style={styles.profile} source={{ uri: img }} />}
                <View style={{ flex: 1, paddingHorizontal: '1%' }}>
                    <Text style={styles.name}>{admin}</Text>
                    <Text style={{ fontSize: 12, color: 'black', marginVertical:6 }}>{date}</Text>
                </View>
                {now === 'admin' ? <Ionicons name="ios-trash" style={{ padding: '5%', fontSize: 28, color: '#747d8c', height: '70%' }}
                    onPress={() => Alert.alert(
                        'Delete',
                        'Do you want to delete the post?',
                        [
                            {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'Yes', onPress: () => remove(index) },
                        ],
                        { cancelable: false },
                    )}

                /> : null}
            </View>

            <View style={{ width: '96%', height: 0.5, backgroundColor: '#a4b0be', alignSelf: 'center' }} />

            {text === undefined ? null : <View style={styles.centerView}>
                <Text style={styles.details}>{text}</Text>
            </View>}


            {image === '' ? null : <View style={styles.bottomView}>
                <Image style={{ width: '100%', height: 350, borderRadius: 4 }} source={{ uri: image }} />
            </View>}


        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        width: '94%',
        backgroundColor: '#ffffff',
        marginVertical: 7,
        borderRadius: 4,
        elevation: 10,
        shadowOpacity: 0.3,
        shadowOffset: { height: 3 },
        alignSelf: 'center'
    },
    topView: {
        width: '100%',
        flexDirection: 'row'
    },
    centerView: {
        width: '100%'
    },
    bottomView: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 30,
        margin: '2%',
        borderColor: '#a4b0be',
        borderWidth: 0.5
    },
    name: {
        fontSize: 18,
        marginTop: '5%'
    },
    details: {
        fontSize: 15,
        paddingHorizontal: '2%',
        paddingVertical: 7,
        // marginBottom:'1'
    }
});

export default Cards;