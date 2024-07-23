import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; 
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type GroupDetailRouteParams = {
    GroupDetail: {
      groupId: string;
    };
  };
  
  
export default function GroupDetailScreen() {
  const [groupDetails, setGroupDetails] = useState<any>(null);
  const route = useRoute<RouteProp<GroupDetailRouteParams, 'GroupDetail'>>();
  const { groupId } = route.params;

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('groups')
          .select('*')
          .eq('id', groupId)
          .single();

        if (error) {
          console.error('Error fetching group details:', error.message);
          Alert.alert('Error', error.message);
        } else {
          setGroupDetails(data);
        }
      } catch (err) {
        console.error('Error in fetchGroupDetails:', err);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <View style={styles.container}>
      {groupDetails ? (
        <>
          <Text style={styles.headerText}>{groupDetails.name}</Text>
          <Text style={styles.detailText}>Created by: {groupDetails.created_by}</Text>
          {/* Add more group details here as needed */}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
