import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, userId } = await req.json();

    console.log('Received chat request:', { message, sessionId, userId });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Save user message to database
    const { error: messageError } = await supabase
      .from('chatbot_messages')
      .insert({
        user_message: message,
        session_id: sessionId,
        user_id: userId,
        bot_response: '' // Will be updated later
      });

    if (messageError) {
      console.error('Error saving message:', messageError);
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: `أنت مساعد ذكي متخصص في إنشاء المواقع والتطبيقات. تساعد المستخدمين في:
- تطوير مواقع الويب باستخدام React, Vue, Angular
- إنشاء تطبيقات الموبايل
- تصميم APIs وقواعد البيانات
- إعطاء نصائح للبرمجة وأفضل الممارسات
- مساعدة في تصدير ونشر المشاريع

أجب باللغة العربية بشكل واضح ومفيد. قدم حلول عملية وأمثلة كود عند الحاجة.`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    console.log('OpenAI response:', botResponse);

    // Update the message record with bot response
    const { error: updateError } = await supabase
      .from('chatbot_messages')
      .update({ bot_response: botResponse })
      .eq('session_id', sessionId)
      .eq('user_message', message)
      .order('created_at', { ascending: false })
      .limit(1);

    if (updateError) {
      console.error('Error updating message:', updateError);
    }

    return new Response(JSON.stringify({ 
      response: botResponse,
      sessionId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'حدث خطأ في المساعد الذكي' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});