import React, { useState, useEffect } from 'react';
import { Touchable } from 'react-native';
import { View, Text, ButtoN, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from '../configs/colors'
import GlobalState from './../context/GlobalState'


export default function HomeScreen(props) {
    const styles = StyleSheet.create({
        mainApp: {
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',

        },

        maintxt: {
            fontWeight: '700',
            fontSize: 24,
        },

        subtxt: {
            fontSize: 24,
            fontWeight: '600',
            marginVertical: 20
        },

        

        Exp: {
            height: 50,
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            paddingLeft: 12
        },

        innertxt: {
            color: 'white',
            fontWeight: '700',
            marginLeft: 15,
            fontSize: 18
        },

        innertxt2: {
            color: 'white',
            fontWeight: '700',
            marginLeft: 12,
            fontSize: 18
        },

        innertxt3: {
            color: 'white',
            fontWeight: '700',
            marginLeft: 10,
            fontSize: 18
        }
    })

    const Redirect = (input) => {
        props.navigation.navigate(input)
    }

    return (
    <GlobalState>
        <View style={styles.mainApp}>
            <AddTransaction
                isVisible={true}
                toggleModal={true}
                colors={Colors}
            />
            {/* <TouchableOpacity style={styles.Exp} onPress={Redirect.bind(this, 'Tracker')}>
                <Icon
                    name="money"
                    type="font-awesome"
                    color="white"
                    size={32}
                />
                <Text style={styles.innertxt3}>Budget Entry</Text>
            </TouchableOpacity> */}
        </View>
    </GlobalState>

    )
}
