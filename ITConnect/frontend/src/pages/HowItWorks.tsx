import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-playfair text-5xl font-semibold text-charcoal mb-6">
            How IT Conect Works
          </h1>
          <p className="text-stone text-xl max-w-2xl mx-auto mb-12">
            Our platform makes it simple to connect talented developers with great companies. Here's how we do it.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-semibold">1</span>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Create Your Profile
              </h3>
              <p className="text-stone">
                Sign up and create your detailed profile. For developers, showcase your skills and experience. For companies, describe your team and opportunities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-semibold">2</span>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Smart Matching
              </h3>
              <p className="text-stone">
                We try to matche developers with companies based on skills, experience, and preferences for the perfect fit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-semibold">3</span>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Connect & Collaborate
              </h3>
              <p className="text-stone">
                Connect directly with matches, schedule interviews, and find your next opportunity or team member.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-stone text-lg mb-8">
            Join our platform today and experience the future of tech recruitment.
          </p>
          <Link to="/">
            <Button className="bg-charcoal text-white hover:bg-stone transition-colors px-8 py-6 text-lg">
              Create Your Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 