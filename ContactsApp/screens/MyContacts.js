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
import {SwipeListView} from 'react-native-swipe-list-view';

export default function MyContacts({navigation}) {
  const isFocused = useIsFocused();
  const [myContacts, setMyContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, [isFocused]);

  async function getAllContacts() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (permission === 'granted') {
        const contacts = await Contacts.getAll();
        console.log(contacts);
        setMyContacts(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={62}
        color="green"
        style={styles.addIcon}
        onPress={() => navigation.navigate('CreateContact')}
      />
      <SwipeListView
        data={myContacts}
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
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
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
