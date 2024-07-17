import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uhmhyggrhchyhekkvsky.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobWh5Z2dyaGNoeWhla2t2c2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNzMwMjYsImV4cCI6MjAzNjc0OTAyNn0._yscX4gkMsSFxIqgrmpGRfEpboYPXhQNfmuQ4M6qb9w"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})