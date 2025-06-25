import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, ChevronRight, Search, ArrowRight, Building2, Code2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { toast } from 'sonner';
import api from "@/config/api";

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await api.post('/newsletter/subscribe', { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to subscribe';
      toast.error(errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 border-b border-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-playfair text-2xl font-semibold text-charcoal">
            IT Connect
          </Link>
          <div className="hidden md:flex space-x-8 text-charcoal/80 font-medium">
            <Link to="/how-it-works" className="hover:text-charcoal transition-colors">How it Works</Link>
            <Link to="/for-companies" className="hover:text-charcoal transition-colors">For Companies</Link>
            <Link to="/for-developers" className="hover:text-charcoal transition-colors">For Developers</Link>
            <Link to="/about" className="hover:text-charcoal transition-colors">About</Link>
          </div>
        </div>
      </nav>

      

      {/* Services Section (Merged) */}
      <section className="relative bg-[#f8f5f2] py-32 px-6">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="text-[15rem] md:text-[22rem] font-bold text-black/5 font-playfair select-none leading-none tracking-tight">
            CONNECT
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h3 className="uppercase text-center text-sm tracking-widest text-muted-foreground mb-4">
            SERVICES & OFFERINGS
          </h3>
          <h2 className="text-center font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-16">
            I HAVE SEVERAL SERVICE OFFERINGS THAT MAY HELP YOUR BUSINESS GROW FAST!
          </h2>

          <div className="mx-auto max-w-3xl mb-24 rounded-xl overflow-hidden shadow-xl">
            <div className="relative">
              <img
                src="images\mission-photo.png.jfif"
                alt="Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <h3 className="font-playfair text-4xl md:text-5xl font-semibold mb-8 text-foreground">
                I'm a Company
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-12 text-lg max-w-md mx-auto">
                Find and invite verified developers. Access a talent pool of pre-screened professionals.
              </p>
              <div className="space-y-4">
                <Link to="/company-register">
                  <Button variant="outline" className="w-full uppercase tracking-[0.2em] text-xs font-medium px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    Sign Up as Company
                  </Button>
                </Link>
                <Link to="/company-login">
                  <Button variant="outline" className="w-full uppercase tracking-[0.2em] text-xs font-medium px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    Login as Company
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-playfair text-4xl md:text-5xl font-semibold mb-8 text-foreground">
                I'm a Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-12 text-lg max-w-md mx-auto">
                Showcase your skills and get matched with companies looking for your expertise.
              </p>
              <div className="space-y-4">
                <Link to="/developer-register">
                  <Button variant="outline" className="w-full uppercase tracking-[0.2em] text-xs font-medium px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    Sign Up as Developer
                  </Button>
                </Link>
                <Link to="/developer-login">
                  <Button variant="outline" className="w-full uppercase tracking-[0.2em] text-xs font-medium px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    Login as Developer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Real-Time Statistics */}
      <section 
        className="relative bg-cover bg-center text-white py-24 px-8"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="bg-charcoal/80 absolute inset-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-8">
            Real-Time Matching Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">12,500+</div>
              <div className="text-lg opacity-90">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">9,300</div>
              <div className="text-lg opacity-90">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Verified Profiles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose IT Conect */}
      <section className="bg-cream py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Professional workspace"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-6">
                Why Choose IT Conect?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-charcoal rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">AI-Powered Matching</h3>
                    <p className="text-stone">Advanced algorithms match skills with requirements for perfect fits.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-charcoal rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Verified Profiles</h3>
                    <p className="text-stone">All developers undergo thorough verification and skill assessment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-charcoal rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Real-Time Updates</h3>
                    <p className="text-stone">Get instant notifications about matches and application status.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-charcoal rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">Seamless Experience</h3>
                    <p className="text-stone">Intuitive platform designed for both recruiters and developers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl font-semibold text-charcoal text-center mb-12">
            Trusted by Industry Leaders
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ align: "center", loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="bg-ivory p-8 rounded-lg">
                  <p className="text-stone text-lg mb-4">
                    "We discovered outstanding developer talent through IT Conect. Their platform made the process fast and seamless."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-charcoal">Elira Hoxha</h4>
                      <p className="text-stone text-sm">Head of Talent Acquisition, Gjirafa</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="bg-ivory p-8 rounded-lg">
                  <p className="text-stone text-lg mb-4">
                    "Finding specialized engineers used to take months. With IT Conect, we had high-quality applicants in just a few days."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-charcoal">Arben Luma</h4>
                      <p className="text-stone text-sm">CTO, Kutia</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="bg-ivory p-8 rounded-lg">
                  <p className="text-stone text-lg mb-4">
                    "IT Conect provided a level of candidate curation that surpassed other platforms we've tried. It's a game changer for tech hiring in the region."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-charcoal">Donika Krasniqi</h4>
                      <p className="text-stone text-sm">Senior HR Partner, Alexander Chapman & Co.</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="bg-ivory p-8 rounded-lg">
                  <p className="text-stone text-lg mb-4">
                    "As a fast-growing fintech company, we needed top developers quickly. IT Conect delivered exactly that—fast and with precision."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-charcoal">Drilon Berisha</h4>
                      <p className="text-stone text-sm">VP of Engineering, Banka e Kosovës</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="bg-ivory p-8 rounded-lg">
                  <p className="text-stone text-lg mb-4">
                    "We've scaled our tech team significantly thanks to IT Conect. The platform is intuitive, and support is always responsive."
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-charcoal">Shqipe Ramadani</h4>
                      <p className="text-stone text-sm">People Operations Lead, SolTech Prishtina</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter Sign-Up */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-ivory p-8 rounded-lg text-center">
            <h2 className="font-playfair text-4xl font-semibold text-charcoal mb-4">Stay Informed</h2>
            <p className="text-stone mb-8 max-w-2xl mx-auto">
              Get the latest insights on tech hiring trends, career development tips, and industry news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                className="bg-charcoal text-ivory hover:bg-charcoal/90"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-xl mb-4">IT Conect</h3>
              <p className="text-ivory/80">
                Connecting tech talent with innovative companies in Kosovo and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-ivory/80 hover:text-ivory">About Us</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-ivory/80 hover:text-ivory">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/about" className="text-ivory/80 hover:text-ivory">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/for-companies" className="text-ivory/80 hover:text-ivory">Post a Job</Link>
                </li>
                <li>
                  <Link to="/for-companies" className="text-ivory/80 hover:text-ivory">Find Developers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Developers</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/for-developers" className="text-ivory/80 hover:text-ivory">Find Jobs</Link>
                </li>
                <li>
                  <Link to="/for-developers" className="text-ivory/80 hover:text-ivory">Create Profile</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-ivory/20 mt-12 pt-8 text-center text-ivory/60">
            © 2025 IT Conect. All rights reserved. Designed with elegance for the tech community.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
