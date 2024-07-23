import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account/Account';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text } from 'react-native';
import { Session } from '@supabase/supabase-js';
import HomeScreen from './components/Homescreen/HomeScreen';
import GroupsScreen from './components/Groups/GroupScreen';

const Tab = createBottomTabNavigator();





function AppTabs({ session }: { session: Session }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account">
        {() => <Account session={session} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      {session && session.user ? (
        <AppTabs session={session} />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
