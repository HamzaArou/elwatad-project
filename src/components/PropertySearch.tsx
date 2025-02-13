
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
    <section className="relative -mt-[89.5px] z-10">
      <div className="container mx-auto px-4">
        <div style={{ width: "1120px", height: "179px" }} className="mx-auto bg-white rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Right Side - Text */}
            <div className="text-right px-8">
              <h2 className="text-3xl font-bold text-deepBlue mb-2">
                اختر عقارك الآن
              </h2>
              <p className="text-xl text-gray-600">
                نساعدك على امتلاك منزل أحلامك
              </p>
            </div>

            {/* Left Side - Selection Options */}
            <div className="flex flex-col gap-4 px-8">
              {/* City Selection */}
              <div className="grid grid-cols-2 gap-4">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.name)}
                    className={cn(
                      "relative h-16 rounded-lg overflow-hidden group transition-all duration-300",
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
                    <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Property Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.name)}
                    className={cn(
                      "py-2 px-4 rounded-lg text-center transition-all duration-300",
                      selectedType === type.name
                        ? "bg-gold text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    <span className="text-base font-semibold">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
