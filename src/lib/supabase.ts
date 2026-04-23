import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bdvbrubhvbdshhsyecls.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdmJydWJodmJkc2hoc3llY2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MDUzNTQsImV4cCI6MjA5MjQ4MTM1NH0.CWF-AOFaVNs1U0qaakjzC3nJ6krjPVAHO5eKjRVCPlU';

export const supabase = createClient(supabaseUrl, supabaseKey);
