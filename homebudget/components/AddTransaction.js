import color from 'color';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import TransactionContext from '../context/TransactionContext'

export default function AddTransaction(props) {



    const styles = StyleSheet.create({
        mainModalStyle: {
            backgroundColor: props.colors.white,
            height: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },

        inputBox: {
            borderWidth: 3,
            padding: 5,
            paddingLeft: 10,
            borderColor: 'black',
            width: '80%'
        },

        nameModule: {
            width: '90%',
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'

        },
        nameModuleBig: {
            width: '90%',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'

        },

        nameModuleHeading: {
            fontSize: 20
        },

        bottomContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '90%'
        },

        modalButton: {
            width: '30%',
            backgroundColor: props.colors.green,
            padding: 10,
            alignItems: 'center',
            borderRadius: 5
        },

        modalButtonDisabled: {
            width: '30%',
            backgroundColor: 'lightgray',
            padding: 10,
            alignItems: 'center',
            borderRadius: 5
        }
    })



    const context = useContext(TransactionContext)

    const [data, setData] = useState({
        name: '',
        amount: 0
    })

    useEffect(() => {
        setData({
            name: '',
            amount: 0,
            actAmount:0,
            id: Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1)
        })
    }, [props.toggleModal])

    useEffect(() => {
        const Toggeler = () => {
            props.toggleModal
        }

        Toggeler()
    }, [context.addTransaction])


    const changeName = (input) => {
        setData({ ...data, name: input })
    }

    const AmountChange = (input) => {

        if (input.includes('-')) {
            let negativeData = Math.abs(parseInt(input.replace('-', '')))
            setData({ ...data, amount: negativeData })
        }
        else {
            let PositiveData = Math.abs(parseInt(input))
            setData({ ...data, amount: PositiveData })
        }
    }

    const ActAmountChange = (input) => {

        if (input.includes('-')) {
            let negativeData = Math.abs(parseInt(input.replace('-', '')))
            setData({ ...data, actAmount: negativeData })
        }
        else {
            let PositiveData = Math.abs(parseInt(input))
            setData({ ...data, actAmount: PositiveData })
        }
    }

    return (
        <View style={styles.mainModalStyle}>
            <View style={styles.nameModule}>
                <Text style={styles.nameModuleHeading}>Budget Entry Name</Text>
                <TextInput style={styles.inputBox} placeholder="Name" onChangeText={changeName} />
            </View>
            <View style={styles.nameModuleBig}>
                <Text style={styles.nameModuleHeading}>Planned Amount</Text>
                <TextInput style={styles.inputBox} placeholder="1000" onChangeText={AmountChange} />                        
            </View>
            <View style={styles.nameModuleBig}>
                <Text style={styles.nameModuleHeading}>Actual Amount</Text>
                <TextInput style={styles.inputBox} placeholder="1000" onChangeText={ActAmountChange} />                        
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.Exp} onPress={Redirect.bind(this, 'Tracker')}>
                    <Text style={{ color: props.colors.white }}>Show Items</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={context.addTransaction.bind(this, data)}
                    style={data.amount !== 0 ? styles.modalButton : styles.modalButtonDisabled}>
                    <Text style={{ color: props.colors.white }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>        
    )
}
