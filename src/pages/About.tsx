
import { Building2, Shield, Star, MapPin, Search, Zap, Headphones, Quote, MessageCircleQuestion, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  
  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: "0px"
      });
      observer.observe(ref);
      return observer;
    });
    
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const reviews = [
    {
      author: "الثقفي",
      rating: 5,
      date: "قبل 5 أيام",
      text: "ماشاء الله تبارك الله. التعامل معاكم شفاف ومريح جدا. الله يعطيكم العافيه. على الصدق والامانه واشكر الاخت مياسم الصاعدي الله يجزها خير. ان اشهد انها ما قصرت تعاملها معي جدا راقي ومحترم جدا شكرا جزيلا لكم وجزاكم الله خيرا.",
      avatar: "ا"
    },
    {
      author: "Yasmin Milibary",
      rating: 5,
      date: "قبل أسبوع",
      text: "شكراً بحجم السماء لشركة وتد الكيان وموظفيهم الرائعين .. بفضل الله ثم ب استاذه مياسم الصاعدي امتلكت منزلا🏠😍 ماشاءالله تبارك الله بالها جدا طويل وخلوقه ومحترمة جداً الله يبارك فيها وفي اللي رباها🤲🏻 واشكر كمان استاذ وليد وانصح بالتعامل معاهم الله يوفقهم ويسعدهم ويبارك فيهم❤️✨",
      avatar: "Y"
    },
    {
      author: "Moodi Al Otaibi",
      rating: 5,
      date: "قبل أسبوعين",
      text: "اشكر شركة وتد العقارية على إنجازهم السريع معي وتعاملهم الراقي وحسن الأسلوب والتعامل الطيب واشكر الاستاذ وليد والأستاذ عبدالمجيد والأخت فادية على حسن تعاملهم معنا و الخدمات المقدمة لي.",
      avatar: "M"
    },
    {
      author: "Abdulkareem Altakrouni",
      rating: 5,
      date: "قبل أسبوعين",
      text: "التعامل جداً راقي وشفاف وخاصة الأخت مياسم الصاعدي كانت خير مثال في فن التعامل. الشكر موصول لها ولجميع الأخوات اللي اتعاملت معاهم من ضمنهم الأخت رنا يماني💐.",
      avatar: "A"
    },
    {
      author: "Turke Al Harbi",
      rating: 5,
      date: "قبل 3 أشهر",
      text: "نبدا القول بالسلام اول الله يعطيكم العافية ماشاءالله تبارك الله الحمدلله حصلت البيت عن طريق شركة وتد الكيان وأخص بالشكر استاذة رنا اليماني الله يعطيها العافية كانت معي خطوه بخطوه في ادق التفاصيل إلى ان تم الانتهاء من الاجراءت إنسانه قمه في الذوق والأخلاق والتعامل وخبيرة في مجالها ماشاءالله الي يبحث عن بينت أنصحكم في وتد الكيان من ضمانات وكل شي امتلك بيتك وانت مطمن وبالتوفيق للجميع تحياتي.",
      avatar: "T"
    },
    {
      author: "Mansor Yamani",
      rating: 5,
      date: "قبل شهرين",
      text: "ماشاء الله تبارك الله. التعامل معاكم شفاف ومريح جدا. الله يعطيكم العافيه. على الصدق والامانه واشكر الاخت رنا الدعدي الله يجزها خير. ان اشهد انها ما قصرت.",
      avatar: "M"
    },
    {
      author: "نجوى القرشي",
      rating: 5,
      date: "قبل 5 أشهر",
      text: "أعطيتكم 5 نجوم لأسباب وبالأخص (رنا اليماني). ماشاءالله حريصين وسريعين وحارين في الشغل (يصبرعوكم) بس عشان ينجزوا في أسرع وقت ما اتوقعت بالسرعة دي. صبرت عليا كثير فعشان تبغى تنجز يمكن تحسوا ساعات بالقروشة لكن معذورين على سرعة الإنجاز فعلاً القروشة كانت في محلها جزاكم الله خير ما اتخيلت اتملك شقتي بهذه السرعة. نقطة اخيره، أي مشكلة تواجهكم في تحويل راتب أو في البنك أو في نظام فارس أو أي نظام حكومي ماشاء الله (رنا اليماني) كانت تجيب لي الحل والخطوات بالصور في اسرع وقت في كل نظام عندها ماشاءالله معارف ولا ايه😅 ربي يسعدها وجزاها الله خير هي ونهى اول وحدة كلمتني بعدها رنا.",
      avatar: "ن"
    },
    {
      author: "Yasser Baarmah",
      rating: 5,
      date: "قبل 3 أشهر",
      text: "سعدت كثيرا بالتعامل مع وتد الكيان و كان فريق العمل جدا متعاون وعلى الأخص الأخت هداء و اهنئ الاخ عبد المجيد الاحمدي على فريق العمل المتميز كل التوفيق لكم و سعدت بالتعامل معكم.",
      avatar: "Y"
    },
    {
      author: "Abdullah Hawsawi",
      rating: 5,
      date: "قبل شهر",
      text: "ماشاء الله تبارك الرحمن فريق عمل ممتاز وتعامل جدا راقي ألف شكر للأستاذة مياسم.",
      avatar: "A"
    },
    {
      author: "وليد المالكي",
      rating: 5,
      date: "قبل شهر",
      text: "العمل جدا رائع مع الفريق وكان فريق متميز وإنجاز في الوعود فعلا اختيار موفق لغيري في وتد الكيان العقارية وأخص الشكر للأستاذة فادية بإنهاء المعاملات المالية والورقية وباقي الفريق.",
      avatar: "و"
    }
  ];

  const faqItems = [
    {
      question: "هل تقوم شركة وتد الكيان بالتمويل العقاري لعملائها ؟",
      answer: "وتد الكيان شركة عقارية لا تقوم بالتمويل بل تقوم بالتعاون مع الجهات التمويلية كالبنوك وشركات التمويل لتوفير أفضل الحلول التمويلية المناسبة لعملائها"
    },
    {
      question: "هل تقدم وتد الكيان خدمات استشارية للعملاء المهتمين بشراء العقارات؟",
      answer: "نعم، نقدم استشارات مجانية لمساعدة العملاء على اختيار العقار المناسب بناءً على احتياجاتهم وميزانيتهم، مع تقديم معلومات تفصيلية حول المواقع والمشاريع المتاحة"
    },
    {
      question: "ماهي شروط التملك بنظام التمويل العقاري ؟",
      answer: "يشترط للتملك بنظام التمويل العقاري أن يكون - سعودي الجنسية - موظف حكومي - قطاع خاص معتمد."
    }
  ];

  const nextReview = () => {
    setActiveReviewIndex(prev => prev === reviews.length - 1 ? 0 : prev + 1);
  };
  const prevReview = () => {
    setActiveReviewIndex(prev => prev === 0 ? reviews.length - 1 : prev - 1);
  };
  return <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] md:h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/lovable-uploads/f8b0b008-dcc3-45d4-ada1-880d52ca59c5.png" alt="وتد الكيان العقارية" className="w-full h-full object-cover object-bottom" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl mb-4 animate-fade-in text-gray-50 font-extrabold py-0 md:text-9xl">من نحن</h1>
          <p className="text-xl animate-fade-in delay-200 md:text-4xl">تعرف على وتد الكيان العقارية</p>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7E4C8]/10 to-white" />
        <div className="container mx-auto px-4 relative">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              عن وتد الكيان العقارية
            </h2>
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed relative">
              <span className="block transform transition-all duration-700 hover:scale-105">
                في وتد الكيان العقارية، نؤمن بأن العقار ليس مجرد مبنى، بل هو استثمار لحياة أفضل. نسعى لتقديم حلول عقارية متكاملة تناسب احتياجاتك، سواء كنت تبحث عن منزل الأحلام أو فرصة استثمارية واعدة.
              </span>
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#B69665] to-[#2F4447] mx-auto my-8 transform transition-all duration-500 hover:scale-x-110" />
            <p className="text-lg text-gray-700 leading-relaxed">
              نعمل بخبرة واحترافية لنكون شريكك العقاري الموثوق، ونوفر لك مجموعة متنوعة من العقارات في أفضل المواقع، مع خدمات استشارية ودعم متكامل قبل وأثناء وبعد الشراء.
            </p>
            <p className="text-2xl font-bold text-[#2F4447] mt-8 relative">
              <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#B69665] after:transform after:origin-left after:transition-transform after:duration-300 after:hover:scale-x-100">
                وتد الكيان العقارية – حيث يلتقي الطموح بالواقع!
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              خدمات ما بعد البيع
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed animate-fade-in">
              لأن راحتك تهمنا في وتد الكيان العقارية، لا تنتهي علاقتنا بك بمجرد شراء العقار، بل نحرص على تقديم خدمات ما بعد البيع لضمان راحتك ورضاك التام. نقدم لك دعمًا متكاملاً يشمل:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[{
            title: "الاستشارات العقارية",
            description: "لمساعدتك في أي استفسارات بعد الشراء",
            icon: Shield,
            delay: 100
          }, {
            title: "متابعة الإجراءات",
            description: "دعمك في التوثيق ونقل الملكية بكل سهولة",
            icon: Building2,
            delay: 200
          }, {
            title: "الصيانة والتجهيز",
            description: "ربطك بمزودي الخدمات الموثوقين لتحسين وتجهيز العقار",
            icon: Star,
            delay: 300
          }, {
            title: "إدارة العقارات",
            description: "للمستثمرين الراغبين في تأجير عقاراتهم بكل احترافية",
            icon: Building2,
            delay: 400
          }].map((service, index) => <div key={index} ref={el => observerRefs.current[index] = el} className="transform opacity-0 translate-y-8 transition-all duration-700 ease-out service-card">
                <Card className="bg-white hover:shadow-xl transition-all duration-500 group h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B69665]/20 to-[#2F4447]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-[#B69665] group-hover:text-[#2F4447] transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2F4447] mb-3 group-hover:text-[#B69665] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B69665]/5 to-[#2F4447]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </CardContent>
                </Card>
              </div>)}
          </div>
        </div>
      </section>

      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              مانتميز به
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed animate-fade-in">
              في وتد الكيان العقارية، نؤمن بأن نجاحنا يأتي من قدرتنا على تقديم تجربة عقارية استثنائية تجمع بين الجودة، الاحترافية، والثقة. نحن نتميز بـ:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
            icon: Briefcase,
            title: "الخبرة الواسعة",
            description: "فريق متخصص في السوق العقاري يوفر لك أفضل الحلول والاستشارات",
            delay: 500
          }, {
            icon: MapPin,
            title: "عقارات في مواقع استراتيجية",
            description: "نوفر لك خيارات مميزة في أفضل الأحياء والمناطق",
            delay: 600
          }, {
            icon: Search,
            title: "شفافية ووضوح",
            description: "نحرص على تقديم معلومات دقيقة لضمان اتخاذ قرارات استثمارية صحيحة",
            delay: 700
          }, {
            icon: Zap,
            title: "سرعة الإنجاز",
            description: "إجراءات سلسة وسريعة لإنهاء معاملاتك بكل سهولة",
            delay: 800
          }, {
            icon: Headphones,
            title: "خدمة عملاء متميزة",
            description: "دعم مستمر وخدمات ما بعد البيع لضمان راحتك ورضاك",
            delay: 900
          }].map((advantage, index) => <div key={index} ref={el => observerRefs.current[index + 4] = el} className="transform opacity-0 translate-y-8 transition-all duration-700 ease-out advantage-card">
                <Card className="group relative overflow-hidden bg-white hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border-2 hover:border-[#B69665] h-full">
                  <CardContent className="p-6">
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B69665]/10 to-[#2F4447]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <advantage.icon className="w-8 h-8 text-[#B69665] group-hover:text-[#2F4447] transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-[#2F4447] mb-4 group-hover:text-[#B69665] transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {advantage.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B69665]/5 to-[#2F4447]/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </CardContent>
                </Card>
              </div>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#2F4447]/10 to-[#B69665]/5 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#B69665]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2F4447]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              تقييمات عملائنا
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-gray-700 leading-relaxed animate-fade-in font-extralight text-2xl">
              نفخر بثقة عملائنا الكرام ونسعد بمشاركة تجاربهم مع وتد الكيان العقارية
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-[20px] shadow-xl p-8 md:p-10 transform transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute -top-6 right-10 bg-[#B69665] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 transform rotate-180" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2F4447] to-[#B69665] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {reviews[activeReviewIndex].avatar}
                </div>
                
                <div className="flex-1 text-right">
                  <div className="flex justify-between items-center flex-col md:flex-row gap-2">
                    <h3 className="text-2xl font-bold text-[#2F4447]">{reviews[activeReviewIndex].author}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 text-sm ml-2">{reviews[activeReviewIndex].date}</span>
                      <div className="flex">
                        {Array.from({
                        length: reviews[activeReviewIndex].rating
                      }).map((_, i) => <Star key={i} className="w-5 h-5 fill-[#B69665] text-[#B69665]" />)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-lg text-gray-700 leading-relaxed">{reviews[activeReviewIndex].text}</p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <button onClick={prevReview} className="bg-gray-100 hover:bg-gray-200 text-[#2F4447] rounded-full p-3 transition-colors duration-300" aria-label="Previous review">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                
                <div className="flex gap-2">
                  {reviews.map((_, index) => <button key={index} onClick={() => setActiveReviewIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeReviewIndex ? 'bg-[#B69665] w-6' : 'bg-gray-300'}`} aria-label={`Go to review ${index + 1}`} />)}
                </div>
                
                <button onClick={nextReview} className="bg-gray-100 hover:bg-gray-200 text-[#2F4447] rounded-full p-3 transition-colors duration-300" aria-label="Next review">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <a href="https://www.google.com/maps/place/وتد+الكيان+العقارية%E2%80%AD/@21.3662659,39.824284,911m/data=!3m1!1e3!4m8!3m7!1s0x15c205cb08a7e865:0x8c5783c3906c45b1!8m2!3d21.3662659!4d39.824284!9m1!1b1!16s%2Fg%2F11w1xtszq3?entry=ttu" target="_blank" rel="noopener noreferrer" className="bg-white text-[#2F4447] border-2 border-[#B69665] hover:bg-[#B69665] hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-md">
              <span>المزيد من التقييمات على خرائط Google</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h2 className="inline-block bg-white px-6 py-3 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-[#2F4447] font-extrabold text-4xl -mt-12 shadow-lg border-2 border-[#B69665]">
              الأسئلة الشائعة
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-lg text-gray-700 leading-relaxed">
              إليك إجابات على بعض الأسئلة الأكثر شيوعًا حول خدماتنا العقارية
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
            <div className="p-1">
              <Accordion type="single" collapsible className="w-full" dir="rtl">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#B69665]/30 last:border-0">
                    <AccordionTrigger className="py-5 px-6 text-right hover:no-underline hover:bg-[#F7E4C8]/10 transition-all duration-300 group text-lg font-bold text-[#2F4447]">
                      <div className="flex items-center gap-3 w-full">
                        <MessageCircleQuestion className="flex-shrink-0 w-6 h-6 text-[#B69665] group-hover:text-[#2F4447] transition-colors duration-300" />
                        <span className="flex-1 text-right">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed text-right bg-gradient-to-r from-[#F7E4C8]/5 to-transparent">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6">
                          {/* Empty div for alignment */}
                        </div>
                        <div className="flex-1">
                          {item.answer}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="h-2 bg-gradient-to-r from-[#B69665] to-[#2F4447]"></div>
          </div>
          
          <div className="mt-10 text-center">
            <a href="mailto:info@watadalkayan.com" className="inline-flex items-center gap-2 bg-white text-[#2F4447] hover:text-[#B69665] border-2 border-[#B69665] px-6 py-3 rounded-full font-bold transition-all duration-300">
              <span>هل لديك سؤال آخر؟ راسلنا</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
            </a>
          </div>
        </div>
      </section>

      <style>
        {`
          .service-card.show,
          .advantage-card.show {
            opacity: 1;
            transform: translateY(0);
          }

          .perspective {
            perspective: 1000px;
          }

          .transform-style-3d {
            transform-style: preserve-3d;
          }

          .backface-hidden {
            backface-visibility: hidden;
          }

          .rotate-y-180 {
            transform: rotateY(180deg);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </main>;
};
export default About;
