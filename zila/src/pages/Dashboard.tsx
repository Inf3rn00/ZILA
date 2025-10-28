import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import { Ticket, CheckCircle, Clock, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Load ticket statistics from localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const stats = {
      total: tickets.length,
      open: tickets.filter((t: any) => t.status === "open").length,
      inProgress: tickets.filter((t: any) => t.status === "in_progress").length,
      closed: tickets.filter((t: any) => t.status === "closed").length,
    };
    setStats(stats);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container-app py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">TicketFlow</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.name}!
            </p>
          </div>
          <Button onClick={logout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container-app">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-muted-foreground">
              Overview of your ticket management system
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Tickets
                </CardTitle>
                <Ticket className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time tickets
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[hsl(var(--status-open))]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Open Tickets
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--status-open-light))] text-[hsl(var(--status-open))] flex items-center justify-center">
                  <Ticket className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[hsl(var(--status-open))]">
                  {stats.open}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting action
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[hsl(var(--status-progress))]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--status-progress-light))] text-[hsl(var(--status-progress))] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[hsl(var(--status-progress))]">
                  {stats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Being worked on
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-[hsl(var(--status-closed))]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resolved
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--status-closed-light))] text-[hsl(var(--status-closed))] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[hsl(var(--status-closed))]">
                  {stats.closed}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Completed tickets
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link to="/tickets" className="flex-1">
                <Button className="w-full">
                  <Ticket className="w-5 h-5 mr-2" />
                  Manage Tickets
                </Button>
              </Link>
              <Link to="/tickets?action=create" className="flex-1">
                <Button className="w-full">Create New Ticket</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
