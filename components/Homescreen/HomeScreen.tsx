import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import Avatar from '../Account/Avatar'


export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  