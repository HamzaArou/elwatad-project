
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";

const PropertySearch = () => {
  const [selectedCity, setSelectedCity] = useState("جدة");
  const [selectedType, setSelectedType] = useState("فيلا");
  const navigate = useNavigate();
  
  const cities = [{
    id: "jeddah",
    name: "جدة",
    image: "/lovable-uploads/aafd9d6d-4172-4438-9c2b-17e2cfa6d870.png"
  }, {
    id: "makkah",
    name: "مكة",
    image: "/lovable-uploads/d926f0ff-6143-4dd3-a849-c5bee016bf9c.png"
  }];
  
  const propertyTypes = [{
    id: "villa",
    name: "فيلا"
  }, {
    id: "apartment",
    name: "شقة"
  }, {
    id: "roof",
    name: "روف"
  }, {
    id: "land",
    name: "أرض"
  }];

  const navigateToProperties = (filters: any) => {
    navigate('/properties', { 
      state: { initialFilters: filters }
    });
    window.scrollTo(0, 0);
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const fullCityName = `مدينة ${cityName}`;
    navigateToProperties({
      cities: [fullCityName],
      district: "",
      propertyTypes: [],
      rooms: [],
      bathrooms: [],
      areaRange: [0, 1000],
      valueRange: [0, 10000000]
    });
  };

  const handleTypeSelect = (typeName: string) => {
    setSelectedType(typeName);
    navigateToProperties({
      cities: [],
      district: "",
      propertyTypes: [typeName],
      rooms: [],
      bathrooms: [],
      areaRange: [0, 1000],
      valueRange: [0, 10000000]
    });
  };

  return (
    <section className="relative -mt-[89.5px] z-10">
      <div className="container mx-auto px-4">
        <div style={{
          maxWidth: "1120px"
        }} className="mx-auto bg-white shadow-lg px-[12px] py-[26px] rounded-xl my-0 -mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Right Side - Text */}
            <div className="text-right px-[31px] -mt-6">
              <h2 className="font-bold text-deepBlue mb-2 px-[2px] py-[2px] text-4xl">
                اختر عقارك الآن
              </h2>
              <p className="text-gray-600 text-2xl">
                نساعدك على امتلاك منزل أحلامك
              </p>
            </div>

            {/* Left Side - Selection Options */}
            <div className="flex flex-col gap-6 px-2">
              {/* City Selection */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex lg:justify-between">
                  {cities.map(city => (
                    <button 
                      key={city.id} 
                      onClick={() => handleCitySelect(city.name)}
                      className={cn(
                        "relative h-24 w-full lg:w-[48%] rounded-lg overflow-hidden group transition-all duration-300",
                        selectedCity === city.name ? "ring-2 ring-gold" : "hover:ring-2 hover:ring-gold/50"
                      )}
                    >
                      <img src={city.image} alt={city.name} className="w-full h-full object-cover brightness-50" />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
                        {city.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-300 h-[2px] w-full rounded-full" />

              {/* Property Type Selection */}
              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyTypes.map(type => (
                    <button 
                      key={type.id}
                      onClick={() => handleTypeSelect(type.name)}
                      className="py-3 px-4 rounded-lg text-center transition-all duration-300 w-full bg-gold text-white hover:bg-gold/90"
                    >
                      <span className="text-lg font-semibold whitespace-nowrap">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
