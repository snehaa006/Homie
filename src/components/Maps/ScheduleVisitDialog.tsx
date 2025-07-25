import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Calendar as CalendarIcon, Clock, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ScheduleVisitDialogProps {
  pgName: string;
  pgAddress: string;
  coordinates?: [number, number];
  children: React.ReactNode;
}

const ScheduleVisitDialog: React.FC<ScheduleVisitDialogProps> = ({
  pgName,
  pgAddress,
  coordinates = [77.5946, 12.9716], // Default to Bangalore coordinates
  children
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  useEffect(() => {
    if (mapboxToken && mapContainer.current && !map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 15
      });

      // Add marker for PG location
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${pgName}</h3>
            <p class="text-sm text-gray-600">${pgAddress}</p>
          </div>
        `))
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, coordinates, pgName, pgAddress]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      toast.success('Map loaded successfully!');
    } else {
      toast.error('Please enter a valid Mapbox token');
    }
  };

  const handleScheduleVisit = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    const visitDate = selectedDate.toLocaleDateString();
    toast.success(`Visit scheduled for ${visitDate} at ${selectedTime} for ${pgName}!`);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pgAddress)}`;
    window.open(googleMapsUrl, '_blank');
    toast.success('Opening Google Maps...');
  };

  const getDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const directionsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${coordinates[1]},${coordinates[0]}`;
        window.open(directionsUrl, '_blank');
        toast.success('Opening directions in Google Maps...');
      }, () => {
        // Fallback if location access denied
        const directionsUrl = `https://www.google.com/maps/dir//${coordinates[1]},${coordinates[0]}`;
        window.open(directionsUrl, '_blank');
        toast.success('Opening directions in Google Maps...');
      });
    } else {
      const directionsUrl = `https://www.google.com/maps/dir//${coordinates[1]},${coordinates[0]}`;
      window.open(directionsUrl, '_blank');
      toast.success('Opening directions in Google Maps...');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Schedule Visit
          </DialogTitle>
          <DialogDescription>
            Plan your visit to {pgName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Info */}
          <div className="p-4 glass-card rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">{pgName}</h3>
                <p className="text-sm text-muted-foreground">{pgAddress}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button onClick={openGoogleMaps} variant="outline" size="sm" className="glass-card">
                <MapPin className="w-4 h-4 mr-1" />
                View on Maps
              </Button>
              <Button onClick={getDirections} variant="outline" size="sm" className="glass-card">
                <Navigation className="w-4 h-4 mr-1" />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Mapbox Token Input */}
          {showTokenInput && (
            <div className="p-4 glass-card rounded-lg border-2 border-primary/20">
              <h3 className="font-semibold mb-2">Setup Map Preview</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Enter your Mapbox public token to view location on map. Get it from{' '}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  mapbox.com
                </a>
              </p>
              <div className="flex gap-2">
                <Input
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1IjoiY..."
                  className="glass-card"
                />
                <Button onClick={handleTokenSubmit} variant="outline" className="glass-card">
                  Load Map
                </Button>
              </div>
            </div>
          )}

          {/* Map */}
          {!showTokenInput && (
            <div className="h-64 rounded-lg overflow-hidden">
              <div ref={mapContainer} className="w-full h-full" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Select Date
              </Label>
              <div className="glass-card p-3 rounded-lg">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="rounded-md"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Select Time
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? "gradient-button" : "glass-card"}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule Button */}
          <Button 
            onClick={handleScheduleVisit} 
            className="w-full gradient-button"
            disabled={!selectedDate || !selectedTime}
          >
            Schedule Visit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleVisitDialog;