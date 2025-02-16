
import { useEffect } from "react";

const Hero = () => {
  return (
    <section
      id="slideShow"
      className="slide-show uk-position-relative uk-visible-toggle uk-light"
      tabIndex={-1}
      uk-slideshow="animation: fade; ratio: false; autoplay: true"
      role="region"
      aria-roledescription="carousel"
    >
      <ul
        className="uk-slideshow-items"
        uk-height-viewport="offset-top: true; offset-bottom: 0"
        aria-live="off"
        role="presentation"
      >
        {/* First Slide */}
        <li
          role="group"
          aria-label="1 of 5"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/3c90a3ab-e014-4310-901b-0d857c0e80dc.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/3c90a3ab-e014-4310-901b-0d857c0e80dc.png"
              />
              <img
                className="object-cover w-[110%] md:w-full h-full"
                src="/lovable-uploads/3c90a3ab-e014-4310-901b-0d857c0e80dc.png"
                alt="مجموعة الفيصل العقارية - مشاريع سكنية فاخرة"
                loading="eager"
                style={{
                  marginLeft: '-5%'
                }}
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                ثقتك بوابتنا لتحقيق حلمك
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>

        {/* Second Slide */}
        <li
          role="group"
          aria-label="2 of 5"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/ddab0cd1-e375-4092-8132-8ed3a49f1748.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/ddab0cd1-e375-4092-8132-8ed3a49f1748.png"
              />
              <img
                className="object-cover w-[110%] md:w-full h-full"
                src="/lovable-uploads/ddab0cd1-e375-4092-8132-8ed3a49f1748.png"
                alt="مجموعة الفيصل العقارية - حلول تمويلية"
                loading="eager"
                style={{
                  marginLeft: '-5%'
                }}
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                شقة العمر على بعد خطوة
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>

        {/* Third Slide */}
        <li
          role="group"
          aria-label="3 of 5"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/7b996429-01ab-44c9-8cf6-08fc77324ee6.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/7b996429-01ab-44c9-8cf6-08fc77324ee6.png"
              />
              <img
                className="object-cover w-[110%] md:w-full h-full"
                src="/lovable-uploads/7b996429-01ab-44c9-8cf6-08fc77324ee6.png"
                alt="مجموعة الفيصل العقارية - تصميم عصري"
                loading="eager"
                style={{
                  marginLeft: '-5%'
                }}
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                خطوتك القادمه تبدا من هنا
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>

        {/* Fourth Slide */}
        <li
          role="group"
          aria-label="4 of 5"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/1cc22874-ae6d-418e-b7aa-1da777bbec2c.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/1cc22874-ae6d-418e-b7aa-1da777bbec2c.png"
              />
              <img
                className="object-cover w-[110%] md:w-full h-full"
                src="/lovable-uploads/1cc22874-ae6d-418e-b7aa-1da777bbec2c.png"
                alt="مجموعة الفيصل العقارية - تصميم حديث"
                loading="eager"
                style={{
                  marginLeft: '-5%'
                }}
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                معنا , لاتبحث فقط اختار
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>

        {/* Fifth Slide */}
        <li
          role="group"
          aria-label="5 of 5"
          aria-roledescription="slide"
          tabIndex={-1}
          className="min-h-screen"
        >
          <div className="uk-position-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left">
            <picture>
              <source
                media="(min-width: 799px)"
                srcSet="/lovable-uploads/d468cdef-669c-4c3a-af46-7d079c45666f.png"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/lovable-uploads/d468cdef-669c-4c3a-af46-7d079c45666f.png"
              />
              <img
                className="object-cover w-[110%] md:w-full h-full"
                src="/lovable-uploads/d468cdef-669c-4c3a-af46-7d079c45666f.png"
                alt="مجموعة الفيصل العقارية - جودة وراحة"
                loading="eager"
                style={{
                  marginLeft: '-5%'
                }}
              />
            </picture>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <div className="uk-position-center uk-position-medium uk-text-center">
            <div className="uk-transition-slide-bottom">
              <h3 className="slide-show__title text-4xl md:text-7xl font-bold text-white mb-8">
                جوده العقار هي اولويتنا وراحتك هدفنا
              </h3>
              <a 
                href="#projects" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-bold text-gold overflow-hidden rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="عرض العقارات المتوفرة"
                style={{
                  background: 'rgba(96, 96, 96, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transform rotate-180"
                  >
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span>عرض العقارات</span>
                </span>
                <span 
                  className="absolute left-0 top-0 h-full w-0 bg-gold transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </li>
      </ul>

      <button
        className="uk-slidenav-previous uk-position-center-left uk-position-small uk-hidden-hover"
        uk-slideshow-item="previous"
        aria-label="Previous slide"
      >
        <svg width="14" height="24" viewBox="0 0 14 24">
          <polyline
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            points="12.775,1 1.225,12 12.775,23"
          ></polyline>
        </svg>
      </button>
      <button
        className="uk-slidenav-next uk-position-center-right uk-position-small uk-hidden-hover"
        uk-slideshow-item="next"
        aria-label="Next slide"
      >
        <svg width="14" height="24" viewBox="0 0 14 24">
          <polyline
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            points="1.225,23 12.775,12 1.225,1"
          ></polyline>
        </svg>
      </button>
    </section>
  );
};

export default Hero;
