const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container-app py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">TicketFlow</h3>
            <p className="text-sm text-muted-foreground">
              Modern ticket management for efficient teams.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="/auth/login" className="hover:text-foreground transition-colors">Login</a></li>
              <li><a href="/auth/signup" className="hover:text-foreground transition-colors">Sign Up</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Support</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
