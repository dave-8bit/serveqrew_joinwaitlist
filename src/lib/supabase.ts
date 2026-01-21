import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mnqypkgrbqhkzwptmaug.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucXlwa2dyYnFoa3p3cHRtYXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzg0MzIsImV4cCI6MjA4MTcxNDQzMn0.F4ddMOGvsUHoh935pmgacBDhl2Z-I4qBRQLhxSLZCNA'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);