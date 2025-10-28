import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import Footer from "../components/footer";
import { toast } from "sonner";
import { z } from "zod";
import { Ticket, Plus, Edit2, Trash2, LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must be less than 500 characters" })
    .optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    message: "Status must be open, in_progress, or closed",
  }),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

const Tickets = () => {
  const { logout } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(savedTickets);
  };

  const saveTickets = (updatedTickets: TicketType[]) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
    setIsCreating(false);
    setEditingTicket(null);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
  };

  const handleEdit = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      ticketSchema.parse(formData);

      if (editingTicket) {
        // Update existing ticket
        const updatedTickets = tickets.map((t) =>
          t.id === editingTicket.id ? { ...t, ...formData } : t
        );
        saveTickets(updatedTickets);
        toast.success("Ticket updated successfully");
      } else {
        // Create new ticket
        const newTicket: TicketType = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
        };
        saveTickets([...tickets, newTicket]);
        toast.success("Ticket created successfully");
      }

      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please fix the validation errors");
      }
    }
  };

  const confirmDelete = () => {
    if (deletingTicket) {
      const updatedTickets = tickets.filter((t) => t.id !== deletingTicket.id);
      saveTickets(updatedTickets);
      toast.success("Ticket deleted successfully");
      setDeletingTicket(null);
    }
  };

  const getStatusVariant = (status: string) => {
    const mapping: Record<
      string,
      "open" | "in_progress" | "closed" | "default"
    > = {
      open: "open",
      in_progress: "in_progress",
      closed: "closed",
    };
    return mapping[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: "Open",
      in_progress: "In Progress",
      closed: "Closed",
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container-app py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <h1 className="text-2xl font-bold hover:text-primary transition-colors cursor-pointer">
                TicketFlow
              </h1>
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              / Tickets
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container-app">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ticket Management</h2>
              <p className="text-muted-foreground">
                Create, view, edit, and manage all your tickets
              </p>
            </div>
            {!isCreating && !editingTicket && (
              <Button onClick={handleCreate} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New Ticket
              </Button>
            )}
          </div>

          {/* Create/Edit Form */}
          {(isCreating || editingTicket) && (
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter ticket title"
                      aria-invalid={!!errors.title}
                      aria-describedby={
                        errors.title ? "title-error" : undefined
                      }
                    />
                    {errors.title && (
                      <p id="title-error" className="text-sm text-destructive">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Provide details about the ticket"
                      rows={4}
                      aria-invalid={!!errors.description}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                    />
                    {errors.description && (
                      <p
                        id="description-error"
                        className="text-sm text-destructive"
                      >
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && (
                        <p className="text-sm text-destructive">
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger id="priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit">
                      {editingTicket ? "Update Ticket" : "Create Ticket"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tickets List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <Card className="col-span-full p-12 text-center">
                <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first ticket to get started
                </p>
                <Button onClick={handleCreate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ticket
                </Button>
              </Card>
            ) : (
              tickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg line-clamp-2">
                        {ticket.title}
                      </CardTitle>
                      <Badge variant={getStatusVariant(ticket.status)}>
                        {getStatusLabel(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {ticket.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {ticket.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="capitalize">
                        {ticket.priority}
                      </Badge>
                      <span>•</span>
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(ticket)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => setDeletingTicket(ticket)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingTicket}
        onOpenChange={() => setDeletingTicket(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the ticket "{deletingTicket?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Tickets;
