const AboutUs = () => {
  return (
    <section className="py-16 bg-[#2B2B2B] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Title visible only on mobile */}
        <h2 className="text-5xl font-bold text-white text-center mb-8 md:hidden">
          عن الشركة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            {/* Title visible only on desktop, positioned at the top of the text */}
            <h2 className="hidden md:block text-5xl font-bold text-white mb-8 text-center">
              عن الشركة
            </h2>
            
            {/* Oblique background with more pronounced slanting and reduced height */}
            <div className="absolute inset-0 bg-[#234F27] transform -skew-x-12 -skew-y-3 rounded-[20px] -z-10"></div>
            
            {/* Content with adjusted padding for reduced height */}
            <div className="relative p-6">
              <p className="text-white/90 leading-relaxed text-lg">
                شركة وتد الكيان العقارية هي شركة رائدة في مجال التطوير والتسويق العقاري، تأسست برؤية رائدة وتفكير إبداعي. نحن نقدم حلولًا متكاملة للعملاء الذين يبحثون عن الجودة والتميز في مجال العقارات. تتسم شركتنا بالالتزام بأعلى معايير الجودة والنزاهة في جميع جوانب عملنا.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-[50px] shadow-2xl">
              <img
                src="/lovable-uploads/846a9d6e-0e88-4891-b25c-203b5b88bc86.png"
                alt="مجموعة الفيصل العقارية - نموذج معماري"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;