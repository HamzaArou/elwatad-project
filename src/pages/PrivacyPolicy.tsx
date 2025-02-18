import Header from "@/components/Header";
import { useEffect } from "react";
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-[960px] mt-[120px]">
        <h1 className="text-3xl font-bold text-deepBlue mb-8">سياسة الخصوصية لـ وتد الكيان العقارية</h1>
        
        <div className="prose prose-lg max-w-none text-right space-y-6">
          <p className="text-gray-600 leading-relaxed">في وتد الكيان العقارية، نحترم خصوصيتك ونتعامل مع بياناتك الشخصية بمنتهى السرية والحرص. تهدف سياسة الخصوصية هذه إلى توضيح كيفية جمع واستخدام وحماية معلوماتك الشخصية عند زيارتك لموقعنا الإلكتروني www.alfaisalgroup.com.sa أو عند تفاعلك معنا عبر أي من قنواتنا.</p>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">1. جمع المعلومات الشخصية</h2>
            <p>عند استخدامك لموقعنا أو خدماتنا، قد نقوم بجمع بعض المعلومات التي تشمل:</p>
            <ul className="list-disc pr-6 mt-2">
              <li>المعلومات التي تقدمها طوعًا: مثل الاسم، البريد الإلكتروني، رقم الهاتف، أو أي معلومات تقدمها من خلال استمارات الاتصال أو التسجيل.</li>
              <li>المعلومات التلقائية: مثل عنوان الـ IP، نوع المتصفح، نظام التشغيل، وتفاصيل حول كيفية تفاعلك مع الموقع باستخدام ملفات تعريف الارتباط (Cookies).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">2. استخدام المعلومات</h2>
            <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
            <ul className="list-disc pr-6 mt-2">
              <li>تقديم الخدمات والرد على استفساراتك وطلباتك.</li>
              <li>تحسين تجربة المستخدم على موقعنا وتطوير خدماتنا.</li>
              <li>إرسال تحديثات أو عروض تسويقية إذا وافقت عليها.</li>
              <li>ضمان الأمان وحماية موقعنا من أي استخدام غير مصرح به.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">3. حماية البيانات</h2>
            <p>نلتزم باتخاذ التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به، أو التغيير، أو الإفشاء، أو التلف.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">4. ملفات تعريف الارتباط (Cookies)</h2>
            <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">5. مشاركة المعلومات مع أطراف ثالثة</h2>
            <p>نحن لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة، إلا في الحالات التالية:</p>
            <ul className="list-disc pr-6 mt-2">
              <li>إذا كان ذلك ضروريًا لتقديم الخدمات المطلوبة منك.</li>
              <li>إذا كان مطلوبًا بموجب القانون أو لحماية حقوقنا القانونية.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">6. حقوق المستخدم</h2>
            <p>لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:</p>
            <ul className="list-disc pr-6 mt-2">
              <li>طلب الوصول إلى البيانات التي نحتفظ بها عنك.</li>
              <li>طلب تصحيح أو تحديث بياناتك.</li>
              <li>طلب حذف بياناتك الشخصية (ضمن الحدود المسموح بها قانونيًا).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">7. الروابط الخارجية</h2>
            <p>قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن سياسات الخصوصية الخاصة بهذه المواقع ونشجعك على مراجعتها قبل تقديم أي بيانات شخصية.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">8. تحديث سياسة الخصوصية</h2>
            <p>قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، ونشجعك على مراجعتها دوريًا.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-deepBlue mb-4">9. الاتصال بنا</h2>
            <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا أو ترغب في ممارسة حقوقك، يمكنك التواصل معنا عبر:</p>
            <ul className="list-disc pr-6 mt-2">
              <li>البريد الإلكتروني: info@alfaisalgroup.com.sa</li>
              <li>رقم الهاتف: 0505148231</li>
              <li>العنوان: القاضي, Batha Quraish, Makkah 24231, Saudi Arabia</li>
            </ul>
          </section>

          <p className="text-gray-600 leading-relaxed mt-8">تؤكد وتد الكيان العقارية التزامها الكامل بحماية خصوصيتك وضمان التعامل مع بياناتك الشخصية بشفافية وأمان.</p>
        </div>
      </main>
    </div>;
};
export default PrivacyPolicy;