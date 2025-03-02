import { Building2, Shield, Star, SparklesIcon, Briefcase, MapPin, Search, Zap, Headphones, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

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
      author: "سعد بن حمد",
      rating: 5,
      date: "قبل شهر واحد",
      text: "سعدت بالتعامل مع وتد الكيان العقارية، كادر احترافي وموثوق، حيث ساعدوني في اختيار وشراء منزل أحلامي بكل سهولة ويسر. أنصح بالتعامل معهم للباحثين عن عقارات مميزة.",
      avatar: "S"
    },
    {
      author: "خالد النفيعي",
      rating: 5,
      date: "قبل 8 أشهر",
      text: "شركة رائعة بكل ما تحمله الكلمة من معنى ومن اكثر الشركات العقارية احترافية ومصداقية وانجاز وشفافية بالتعامل.",
      avatar: "خ"
    },
    {
      author: "حمود الاسمري",
      rating: 5,
      date: "قبل 6 أشهر",
      text: "سعدت بالتعامل مع وتد الكيان العقارية وكادر احترافي وموثوق",
      avatar: "ح"
    },
    {
      author: "Ehab Abdelwahab",
      rating: 5,
      date: "قبل سنة واحدة",
      text: "موثوقية عالية ومصداقية في التعامل",
      avatar: "E"
    },
    {
      author: "Mohammed Zaman",
      rating: 5,
      date: "قبل سنة واحدة",
      text: "شركة ممتازة واسعارهم مناسبة ويتميزون بالمصداقية والامانة",
      avatar: "M"
    },
    {
      author: "ام خلودي",
      rating: 5,
      date: "قبل سنة واحدة",
      text: "تعاملت مع وتد الكيان لشراء وحدة في احد المشاريع وكان تعامل جدا طيب ، وشفافية عالية في ابراز كل ايجابيات وسلبيات العقار، استفدت من خبرتهم في المقارنات بين العقارات، وتم اختيار افضل مايناسبني من بين المعروض.",
      avatar: "ا"
    },
    {
      author: "ساره فهد",
      rating: 5,
      date: "قبل سنة واحدة",
      text: "عمل محترف وخدمة عملاء ممتازة.",
      avatar: "س"
    }
  ];

  const futureFeatures = [
    {
      title: "خدمة التنبيهات الذكية",
      description: "تنبيه المستخدمين عند إضافة عقارات جديدة تلبي مواصفاتهم عبر البريد الإلكتروني أو تطبيق الجوال"
    },
    {
      title: "الأسئلة المتكررة",
      description: "قسم للإجابة على الاستفسارات الشائعة"
    },
    {
      title: "أحدث العروض العقارية",
      description: "البقاء على تواصل معنا، مع عرض آخر العروض على الموقع"
    },
    {
      title: "طلب استشارتك المجانية الآن",
      description: "إبراز قسم الاستشارة"
    },
    {
      title: "خدمات التقييم العقاري",
      description: "قسم يتيح للمستخدمين تقييم العقارات بناءً على معايير مثل الموقع، الأسعار، الجودة"
    },
    {
      title: "تقارير السوق العقاري",
      description: "نشر تقارير دورية عن حالة السوق والتوجهات الحديثة لتحليل الأسعار"
    },
    {
      title: "تجارب العملاء",
      description: "قسم لقصص النجاح أو تقييمات العملاء لبناء الثقة مع الزوار الجدد"
    },
    {
      title: "خاصية البحث المتقدم",
      description: "تحسين محرك البحث ليشمل فلاتر متعددة مثل الموقع، السعر، المساحة، نوع العقار، إلخ"
    },
    {
      title: "خريطة ذكية لتحديد العقار المثالي",
      description: "عرض أفضل أماكن الاستثمار أو السكن بناءً على معايير مثل التعليم، النقل، والمرافق"
    }
  ];

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
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
            <p className="text-lg text-gray-700 leading-relaxed animate-fade-in">
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
                        {Array.from({ length: reviews[activeReviewIndex].rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#B69665] text-[#B69665]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-lg text-gray-700 leading-relaxed">{reviews[activeReviewIndex].text}</p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={prevReview}
                  className="bg-gray-100 hover:bg-gray-200 text-[#2F4447] rounded-full p-3 transition-colors duration-300"
                  aria-label="Previous review"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                
                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveReviewIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeReviewIndex ? 'bg-[#B69665] w-6' : 'bg-gray-300'}`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextReview}
                  className="bg-gray-100 hover:bg-gray-200 text-[#2F4447] rounded-full p-3 transition-colors duration-300"
                  aria-label="Next review"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div 
                key={index}
                ref={el => observerRefs.current[index + 9] = el}
                className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
              >
                <Card className="h-full bg-white hover:shadow-xl transition-all duration-500 group overflow-hidden border-2 border-transparent hover:border-[#B69665]/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2F4447] to-[#B69665] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-[#2F4447]">{review.author}</h3>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                        
                        <div className="flex mt-1 mb-3">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#B69665] text-[#B69665]" />
                          ))}
                        </div>
                        
                        <p className="text-gray-700 text-sm line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <a 
              href="https://www.google.com/maps/place/وتد+الكيان+العقارية%E2%80%AD/@21.3662659,39.824284,911m/data=!3m1!1e3!4m8!3m7!1s0x15c205cb08a7e865:0x8c5783c3906c45b1!8m2!3d21.3662659!4d39.824284!9m1!1b1!16s%2Fg%2F11w1xtszq3?entry=ttu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#2F4447] border-2 border-[#B69665] hover:bg-[#B69665] hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-md"
            >
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
              آفاق نضيفها
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {futureFeatures.map((feature, index) => (
              <div key={index} className="flip-card h-[200px] perspective">
                <div className="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-3d">
                  <div className="flip-card-front absolute w-full h-full backface-hidden">
                    <Card className="h-full bg-white hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                        <SparklesIcon className="w-8 h-8 text-[#B69665] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#2F4447]">{feature.title}</h3>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
                    <Card className="h-full bg-gradient-to-br from-[#2F4447] to-[#B69665]">
                      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center space-y-3">
                        <h3 className="text-xl font-extrabold text-white border-b-2 border-white/30 pb-2">{feature.title}</h3>
                        <p className="text-white text-sm leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
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

          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          @media (hover: none) {
            .flip-card-inner {
              transition: transform 0.3s ease;
            }
            
            .flip-card:active .flip-card-inner {
              transform: rotateY(180deg);
            }
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
