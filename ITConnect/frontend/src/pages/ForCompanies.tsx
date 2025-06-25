import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const ForCompanies = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-playfair text-5xl font-semibold text-charcoal mb-6">
                Find Your Next Tech Star
              </h1>
              <p className="text-stone text-xl mb-8">
                Access a curated pool of verified tech talent. Our AI-powered platform helps you find the perfect developers for your team.
              </p>
              <Link to="/">
                <Button className="bg-charcoal text-white hover:bg-stone transition-colors px-8 py-6 text-lg">
                  Post a Job
                </Button>
              </Link>
            </div>
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
                Why Companies Choose Us
              </h3>
              <div className="space-y-4">
                {[
                  "Pre-screened developer profiles",
                  "AI-powered matching system",
                  "Direct communication with candidates",
                  "Flexible hiring options",
                  "Dedicated support team"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="text-charcoal w-5 h-5" />
                    <span className="text-stone">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Everything You Need to Hire Tech Talent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Smart Matching
              </h3>
              <p className="text-stone">
                Our AI algorithm matches you with developers who have the exact skills and experience you need.
              </p>
            </div>
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Verified Profiles
              </h3>
              <p className="text-stone">
                Every developer is pre-screened and verified to ensure high-quality candidates.
              </p>
            </div>
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Easy Management
              </h3>
              <p className="text-stone">
                Manage your job postings, applications, and communications all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-8 bg-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-stone text-lg mb-12">
            Choose the plan that works best for your hiring needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-cream rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Standard
              </h3>
              <div className="text-4xl font-bold text-charcoal mb-6">Free<span className="text-lg text-stone">/mo</span></div>
              <ul className="text-stone space-y-3 mb-8">
                <li>Up to 3 active job postings</li>
                <li>Basic AI matching</li>
                <li>Basic company profile</li>
                <li>Community support</li>
              </ul>
              <Link to="/">
                <Button variant="outline" className="w-full">Start Free</Button>
              </Link>
            </div>
            <div className="p-8 bg-cream rounded-lg border-2 border-charcoal">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Premium
              </h3>
              <div className="text-4xl font-bold text-charcoal mb-6">$599<span className="text-lg text-stone">/mo</span></div>
              <ul className="text-stone space-y-3 mb-8">
                <li>Unlimited job postings</li>
                <li>Priority matching</li>
                <li>Advanced analytics</li>
                <li>24/7 priority support</li>
              </ul>
              <Link to="/">
                <Button className="w-full bg-charcoal text-white hover:bg-stone">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForCompanies; 