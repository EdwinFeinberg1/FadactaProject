import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; 
import { StyleSheet, View, Alert, Text, Modal } from 'react-native';
import { Button, Input } from '@rneui/themed';

export default function GroupsScreen() {
  const [groupName, setGroupName] = useState<string>('');
  const [groups, setGroups] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Failed to get session:', error);
          Alert.alert('Error', 'Failed to get session');
        } else if (sessionData?.session) {
          console.log('Session found:', sessionData.session);
          fetchGroups();
        } else {
          console.log('No session found');
          Alert.alert('Error', 'User is not authenticated');
        }
      } catch (err) {
        console.error('Error in checkSession:', err);
      }
    };

    checkSession();
  }, []);

  const fetchGroups = async () => {
    console.log('Fetching groups from Supabase...');
    try {
      const { data, error } = await supabase
        .from('groups')
        .select('name');

      if (error) {
        console.error('Error fetching groups:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Groups fetched:', data);
        if (data) {
          setGroups(data.map(group => group.name));
        }
      }
    } catch (err) {
      console.error('Error in fetchGroups:', err);
    }
  };

  const createGroup = async () => {
    if (newGroupName.trim() !== '') {
      try {
        const { data, error } = await supabase
          .from('groups')
          .insert([{ name: newGroupName }]);

        if (error) {
          console.error('Error creating group:', error.message);
          Alert.alert('Error', error.message);
        } else {
          console.log('Group created:', data);
          setGroups([...groups, newGroupName]);
          setNewGroupName('');
          setModalVisible(false);
        }
      } catch (err) {
        console.error('Error in createGroup:', err);
      }
    } else {
      Alert.alert('Error', 'Group name cannot be empty');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Create a Group" onPress={() => setModalVisible(true)} buttonStyle={styles.button} />
      <Button title="Join a Group" onPress={() => {}} buttonStyle={styles.button} />
      <Text style={styles.headerText}>My Groups</Text>
      {groups.map((group, index) => (
        <Text key={index} style={styles.groupName}>{group}</Text>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Group Name:</Text>
          <Input
            placeholder="Group Name"
            value={newGroupName}
            onChangeText={setNewGroupName}
          />
          <Button title="Create" onPress={createGroup} buttonStyle={styles.button} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} buttonStyle={styles.button} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    marginVertical: 10,
  },
  groupName: {
    fontSize: 18,
    marginVertical: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
