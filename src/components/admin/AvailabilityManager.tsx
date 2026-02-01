import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Clock } from "lucide-react";

interface AvailabilitySetting {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Generate time options from 6 AM to 10 PM
const TIME_OPTIONS = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 6;
  const time = `${hour.toString().padStart(2, '0')}:00`;
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  return { value: time, label: `${displayHour}:00 ${ampm}` };
});

const AvailabilityManager = () => {
  const { toast } = useToast();
  const [availability, setAvailability] = useState<AvailabilitySetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("availability_settings")
      .select("*")
      .order("day_of_week");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load availability settings.",
        variant: "destructive",
      });
    } else {
      setAvailability(data || []);
    }
    setIsLoading(false);
  };

  const handleToggleDay = (dayOfWeek: number, currentValue: boolean) => {
    setAvailability(prev =>
      prev.map(item =>
        item.day_of_week === dayOfWeek
          ? { ...item, is_available: !currentValue }
          : item
      )
    );
  };

  const handleTimeChange = (dayOfWeek: number, field: 'start_time' | 'end_time', value: string) => {
    setAvailability(prev =>
      prev.map(item =>
        item.day_of_week === dayOfWeek
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Update each availability setting
      for (const setting of availability) {
        const { error } = await supabase
          .from("availability_settings")
          .update({
            start_time: setting.start_time,
            end_time: setting.end_time,
            is_available: setting.is_available,
          })
          .eq("id", setting.id);

        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: "Your availability has been updated.",
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "Failed to save availability settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading availability settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Availability Settings
        </CardTitle>
        <CardDescription>
          Configure which days and hours you're available for booking consultations and coaching sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {availability.map((setting) => (
            <div
              key={setting.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border ${
                setting.is_available ? 'bg-background' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <Switch
                  checked={setting.is_available}
                  onCheckedChange={() => handleToggleDay(setting.day_of_week, setting.is_available)}
                />
                <Label className={`font-medium ${!setting.is_available ? 'text-muted-foreground' : ''}`}>
                  {DAYS_OF_WEEK[setting.day_of_week]}
                </Label>
              </div>

              {setting.is_available && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">From</Label>
                    <Select
                      value={setting.start_time.slice(0, 5)}
                      onValueChange={(value) => handleTimeChange(setting.day_of_week, 'start_time', value)}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">To</Label>
                    <Select
                      value={setting.end_time.slice(0, 5)}
                      onValueChange={(value) => handleTimeChange(setting.day_of_week, 'end_time', value)}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {!setting.is_available && (
                <span className="text-sm text-muted-foreground italic">Unavailable</span>
              )}
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AvailabilityManager;
