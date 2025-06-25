import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Briefcase, Target, Award, Quote } from "lucide-react";

const ForDevelopers = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-playfair text-5xl font-semibold text-charcoal mb-6">
                Elevate Your Tech Career
              </h1>
              <p className="text-stone text-xl mb-8">
                Connect with top tech companies, showcase your skills, and find opportunities that match your expertise and career goals.
              </p>
              <Link to="/">
                <Button className="bg-charcoal text-white hover:bg-stone transition-colors px-8 py-6 text-lg">
                  Create Developer Profile
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-cream p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code2 className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">5,000+</h3>
                <p className="text-stone text-sm">Active Jobs</p>
              </div>
              <div className="bg-cream p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">1,000+</h3>
                <p className="text-stone text-sm">Companies</p>
              </div>
              <div className="bg-cream p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">95%</h3>
                <p className="text-stone text-sm">Match Rate</p>
              </div>
              <div className="bg-cream p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white w-6 h-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">$120K+</h3>
                <p className="text-stone text-sm">Avg. Salary</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Why Developers Love IT Conect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Smart Job Matching
              </h3>
              <p className="text-stone">
                Our AI matches you with companies and roles that align with your skills, experience, and career goals.
              </p>
            </div>
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Showcase Your Skills
              </h3>
              <p className="text-stone">
                Create a comprehensive profile to highlight your expertise, projects, and achievements.
              </p>
            </div>
            <div className="p-6 bg-ivory rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Direct Communication
              </h3>
              <p className="text-stone">
                Connect directly with companies, no middlemen or lengthy processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6 text-center">
              From Student to Software Engineer – Arlind's Journey with IT Conect
            </h2>
            <div className="bg-cream p-8 rounded-lg relative">
              <Quote className="text-charcoal/10 w-24 h-24 absolute -top-4 -left-4" />
              <div className="relative z-10">
                <p className="text-stone text-lg mb-6">
                  Arlind, a Computer Science student from Prishtina, was passionate about backend development — but had no idea where to begin when it came to landing his first real job. That changed the moment he created a profile and showcased his projects on IT Conect.
                </p>
                <blockquote className="text-charcoal text-xl italic mb-6">
                  "I never thought I'd get noticed so quickly. Within two weeks, I got invited to an interview by a local tech company I truly admire."
                </blockquote>
                <p className="text-stone text-lg mb-6">
                  Thanks to IT Conect's skill-based matching system, Arlind was able to land a Junior Backend Developer position at a fast-growing startup in Tirana — even before finishing his degree.
                </p>
                <blockquote className="text-charcoal text-xl italic mb-6">
                  "It felt like the platform understood what I could offer, not just what I had on my CV."
                </blockquote>
                <p className="text-stone text-lg mb-6">
                  Today, Arlind continues to grow in his role, and IT Conect remains his trusted platform for career opportunities, learning resources, and connecting with top companies in the region.
                </p>
                <div className="flex items-center space-x-4 mt-8">
                  <div className="w-12 h-12 bg-charcoal rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-charcoal">Arlind</h4>
                    <p className="text-stone text-sm">Junior Backend Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForDevelopers; 