import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lnodigdmbffgybbtjoij.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxub2RpZ2RtYmZmZ3liYnRqb2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MDA1MjIsImV4cCI6MjAzNzE3NjUyMn0.6EzQdtwc7N1j9pLwgG5L2nNT_FrJoHTqMyOA0P1j5TI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})