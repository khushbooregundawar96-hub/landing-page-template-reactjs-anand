import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const submitContact = async (contactData) => {
  try {
    const { email, phone } = contactData;

    if (!email || !phone) {
      throw new Error('Email and phone are required');
    }

    const { data, error } = await supabase
      .from('landingpage')   // ✅ your correct table name
      .insert([{ email, phone }]);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: 'Contact submitted successfully',
    };

  } catch (error) {
    console.error('Error submitting contact:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
