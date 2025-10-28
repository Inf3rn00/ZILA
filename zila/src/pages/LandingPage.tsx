import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import { Ticket, CheckCircle, Clock, BarChart3 } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="wave-background relative bg-linear-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] text-white py-20 md:py-32">
        {/* Decorative circles */}
        <div className="circle-decoration w-64 h-64 -top-20 -right-20 md:w-96 md:h-96" />
        <div className="circle-decoration w-48 h-48 top-1/2 -left-24 md:w-72 md:h-72" />

        <div className="container-app relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Streamline Your Workflow with TicketFlow
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              The modern ticket management solution that helps teams track,
              manage, and resolve issues faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link to="/auth/signup">
                <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to manage tickets
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful features designed to help your team stay organized and
              productive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[hsl(var(--status-open-light))] text-[hsl(var(--status-open))] flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Tickets</h3>
              <p className="text-muted-foreground">
                Quickly create and categorize tickets with detailed information
                and priority levels
              </p>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[hsl(var(--status-progress-light))] text-[hsl(var(--status-progress))] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor ticket status in real-time with clear visual indicators
              </p>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[hsl(var(--status-closed-light))] text-[hsl(var(--status-closed))] flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resolve Faster</h3>
              <p className="text-muted-foreground">
                Streamlined workflows help your team resolve issues efficiently
              </p>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground">
                Get insights into your team's performance with comprehensive
                dashboards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] text-white relative overflow-hidden">
        <div className="circle-decoration w-96 h-96 -bottom-48 -right-48" />
        <div className="container-app relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join teams who are already managing their tickets more efficiently
            with TicketFlow
          </p>
          <Link to="/auth/signup">
            <Button className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
