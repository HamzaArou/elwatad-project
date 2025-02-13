
import { useState } from "react";
import { cn } from "@/lib/utils";

const PropertySearch = () => {
  const [selectedCity, setSelectedCity] = useState("جدة");
  const [selectedType, setSelectedType] = useState("فيلا");

  const cities = [
    {
      id: "jeddah",
      name: "جدة",
      image: "/lovable-uploads/ec951bdf-5286-4f67-aa73-22714ede89b9.png"
    },
    {
      id: "makkah",
      name: "مكة",
      image: "/lovable-uploads/ec951bdf-5286-4f67-aa73-22714ede89b9.png"
    }
  ];

  const propertyTypes = [
    { id: "villa", name: "فيلا" },
    { id: "apartment", name: "شقة" },
    { id: "roof", name: "روف" },
    { id: "land", name: "أرض" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Right Side - Text */}
            <div className="text-right">
              <h2 className="text-3xl font-bold text-deepBlue mb-4">
                اختر عقارك الآن
              </h2>
              <p className="text-xl text-gray-600">
                نساعدك على امتلاك منزل أحلامك
              </p>
            </div>

            {/* Left Side - Selection Options */}
            <div className="space-y-8">
              {/* City Selection */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city.name)}
                      className={cn(
                        "relative h-32 rounded-xl overflow-hidden group transition-all duration-300",
                        selectedCity === city.name 
                          ? "ring-2 ring-gold" 
                          : "hover:ring-2 hover:ring-gold/50"
                      )}
                    >
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover brightness-50"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
                        {city.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type Selection */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.name)}
                      className={cn(
                        "py-3 px-6 rounded-lg text-center transition-all duration-300",
                        selectedType === type.name
                          ? "bg-gold text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      )}
                    >
                      <span className="text-lg font-semibold">{type.name}</span>
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
