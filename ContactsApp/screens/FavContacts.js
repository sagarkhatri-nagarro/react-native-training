import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Touchable,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';

import ContactCard from '../components/ContactCard';

export default function FavContacts({navigation}) {
  const isFocused = useIsFocused();
  const [myFavContacts, setMyFavContacts] = useState([]);

  useEffect(() => {
    getAllFavContacts();
  }, [isFocused]);

  async function getAllFavContacts() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (permission === 'granted') {
        const contacts = await Contacts.getAllFavContacts();
        console.log(contacts);
        setMyFavContacts(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myContacts}
        keyExtractor={item => item.recordID}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                contactInfo: {id: item.recordID},
              })
            }>
            <ContactCard contactInfo={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addIcon: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    zIndex: 1,
  },
});
