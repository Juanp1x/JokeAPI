import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwotzyqapsehsceyjzdt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3b3R6eXFhcHNlaHNjZXlqemR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzgyNDcsImV4cCI6MjA5NTIxNDI0N30.blDSUc1Hy0CTrBEkCrYTT6EcKQlBq2XGMxXgeMYziVI';

export const supabase = createClient(supabaseUrl, supabaseKey);