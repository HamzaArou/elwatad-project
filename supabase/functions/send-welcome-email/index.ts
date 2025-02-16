
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'وتد الكيان العقارية <onboarding@resend.dev>',
      to: email,
      subject: 'مرحباً بك في وتد الكيان العقارية',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1>مرحباً ${name}!</h1>
          <p>شكراً لتسجيلك في وتد الكيان العقارية.</p>
          <p>نحن سعداء بانضمامك إلينا ونتطلع إلى مساعدتك في العثور على منزل أحلامك.</p>
          <p>يمكنك الآن:</p>
          <ul>
            <li>تصفح مشاريعنا العقارية المميزة</li>
            <li>حفظ العقارات المفضلة لديك</li>
            <li>التواصل مع فريق المبيعات</li>
            <li>الاطلاع على آخر التحديثات والعروض</li>
          </ul>
          <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.</p>
          <p>مع تحيات،<br>فريق وتد الكيان العقارية</p>
        </div>
      `,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
