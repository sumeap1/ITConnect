import { Button } from "@/components/ui/button";
import { Users, Target, Globe, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-playfair text-5xl font-semibold text-charcoal mb-6">
            About IT Conect
          </h1>
          <p className="text-stone text-xl max-w-2xl mx-auto mb-12">
            We're on a mission to revolutionize tech recruitment by connecting talented developers with innovative companies through intelligent matching.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white w-8 h-8" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">50,000+</h3>
              <p className="text-stone">Developers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white w-8 h-8" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">10,000+</h3>
              <p className="text-stone">Successful Matches</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white w-8 h-8" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">20+</h3>
              <p className="text-stone">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-8 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6">
            Our Story
          </h2>
          <div className="space-y-6 text-stone text-lg">
            <p>
              Founded in 2025, IT Conect was born from a simple observation: the tech recruitment process was broken. Talented developers were struggling to find suitable opportunities, while companies spent months searching for the ideal candidate.
            </p>
            <p>
              So, Sumea Peci, Erzana Muharremi, and Isme Kastrati three students passionate about technology and innovation started IT Conect in 2025 as a school project with the goal of bringing about a change in the way developers and employers connect.
            </p>
            <p>
              Combining advanced technology with a human-centric approach, our platform uses smart matching algorithms and personal support to build meaningful connections between developers and companies.
            </p>
            <p>
              Today, we are proud to be one of the fastest-growing tech recruitment platforms in the region, helping thousands of developers find their dream jobs and companies build strong tech teams.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-8 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Innovation
              </h3>
              <p className="text-stone">
                We constantly push boundaries to create better ways of connecting talent with opportunity.
              </p>
            </div>
            <div className="p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Transparency
              </h3>
              <p className="text-stone">
                We believe in open, honest communication and fair practices in everything we do.
              </p>
            </div>
            <div className="p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
                Community
              </h3>
              <p className="text-stone">
                We're building a supportive ecosystem where tech professionals can thrive and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ivory p-6 rounded-lg text-center">
              <h3 className="font-semibold text-xl text-charcoal mb-2">Erzana Muharremi</h3>
              <p className="text-stone">Co-Founder & Operations & Business Strategy</p>
            </div>
            <div className="bg-ivory p-6 rounded-lg text-center">
              <h3 className="font-semibold text-xl text-charcoal mb-2">Sumea Peci</h3>
              <p className="text-stone">Co-Founder & UX/UI Lead</p>
            </div>
            <div className="bg-ivory p-6 rounded-lg text-center">
              <h3 className="font-semibold text-xl text-charcoal mb-2">Isme Kastrati</h3>
              <p className="text-stone">Co-Founder & Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="text-charcoal w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                  <p className="text-stone">info@itconect.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-charcoal w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                  <p className="text-stone">+383 44 123 456</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-charcoal w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Location</h3>
                  <p className="text-stone">Prishtine, Kosovo</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="text-charcoal w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">LinkedIn</h3>
                  <a href="https://linkedin.com/company/itconect" className="text-stone hover:text-charcoal transition-colors">
                    IT Conect
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-semibold text-charcoal mb-6 text-xl">Team Contacts</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-charcoal">Sumea Peci</h4>
                  <p className="text-stone">sumea.peci@itconect.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Erzana Muharremi</h4>
                  <p className="text-stone">erzana.muharremi@itconect.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal">Isme Kastrati</h4>
                  <p className="text-stone">isme.kastrati@itconect.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6">
            Join Our Mission
          </h2>
          <p className="text-stone text-lg mb-8">
            Be part of the future of tech recruitment
          </p>
          <Link to="/">
            <Button className="bg-charcoal text-white hover:bg-stone transition-colors px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;