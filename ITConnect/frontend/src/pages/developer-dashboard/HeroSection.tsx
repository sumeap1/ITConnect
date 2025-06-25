import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  userName: string;
  onSearch: (value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName, onSearch }) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = () => {
    onSearch(localSearch);
  };

  return (
    <section className="relative bg-[#F3EFEA] py-20 px-4 text-center shadow-md">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
          Mirësevini, {userName || "Zhvillues"}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Gjej pozitat më të fundit që përputhen me aftësitë e tua!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Input
            type="text"
            placeholder="Pozicioni, kompania ose fjalë kyçe..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 rounded-xl px-4 py-2 shadow-sm"
          />
          <Button
            onClick={handleSearch}
            className="bg-[#1E1E1E] text-white px-6 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            Kërko
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
