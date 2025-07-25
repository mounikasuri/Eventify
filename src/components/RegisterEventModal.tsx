
import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, CreditCard, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define the proper types for props
interface EventData {
  id: number;
  title: string;
  description: string;
  organizer: string;
  date: string;
  location: string;
  participants: number;
  price: number;
  image: string;
  category?: string;
}

interface RegisterEventModalProps {
  event: EventData;
  onClose: () => void;
  onProceedToPayment: (eventId: number) => void;
  isProcessing?: boolean;
}

const RegisterEventModal: React.FC<RegisterEventModalProps> = ({ 
  event, 
  onClose, 
  onProceedToPayment, 
  isProcessing = false 
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    teamSize: 1,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login or sign up to register for events",
        variant: "destructive"
      });
      return;
    }
    
    // Form validation
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // If all validations pass, proceed to payment
    onProceedToPayment(event.id);
    toast({
      title: "Registration Submitted",
      description: "Redirecting to payment..."
    });
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-background rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Login Required</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
              <p className="text-muted-foreground">
                You need to login or sign up to register for events
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                onClick={() => {
                  onClose();
                  navigate('/signup');
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-background z-10 flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Register for Event</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isProcessing}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          {/* Event Summary */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-muted-foreground mb-2">{event.organizer}</p>
                <Badge>{event.category || 'Event'}</Badge>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.participants} Participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">₹{event.price}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Event Description</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          </div>
          
          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter your full name"
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter your email address"
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter your phone number"
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <Label htmlFor="teamSize">Team Size</Label>
                <select 
                  id="teamSize" 
                  name="teamSize" 
                  value={formData.teamSize} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  disabled={isProcessing}
                >
                  <option value="1">Individual (1 Person)</option>
                  <option value="2">Team of 2</option>
                  <option value="3">Team of 3</option>
                  <option value="4">Team of 4</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-eventify-purple to-eventify-blue text-white"
                disabled={isProcessing}
              >
                {isProcessing ? 
                  "Processing..." : 
                  `Proceed to Payment (₹${event.price})`
                }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEventModal;
