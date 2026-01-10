import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentFormData } from "../types";

interface ContactInformationSectionProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
}

const ContactInformationSection = ({ formData, onInputChange }: ContactInformationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 1: Your Contact Information</CardTitle>
        <p className="text-sm text-muted-foreground">
          Please provide your contact details so we can follow up with you confidentially.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Your Full Name *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => onInputChange("contactName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactRelationship">Relationship to Loved One *</Label>
            <Select
              value={formData.contactRelationship}
              onValueChange={(v) => onInputChange("contactRelationship", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="spouse">Spouse/Partner</SelectItem>
                <SelectItem value="child">Adult Child</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="grandparent">Grandparent</SelectItem>
                <SelectItem value="aunt-uncle">Aunt/Uncle</SelectItem>
                <SelectItem value="cousin">Cousin</SelectItem>
                <SelectItem value="friend">Close Friend</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Email Address *</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => onInputChange("contactEmail", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone Number *</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => onInputChange("contactPhone", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Best Day to Contact</Label>
            <Select
              value={formData.bestDayToContact}
              onValueChange={(v) => onInputChange("bestDayToContact", v)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today - URGENT</SelectItem>
                <SelectItem value="any">Any Day</SelectItem>
                <SelectItem value="weekdays">Weekdays Only</SelectItem>
                <SelectItem value="weekends">Weekends Only</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Best Time to Contact</Label>
            <Select
              value={formData.bestTimeToContact}
              onValueChange={(v) => onInputChange("bestTimeToContact", v)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="early-morning">Early Morning (7-9 AM)</SelectItem>
                <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                <SelectItem value="any">Any Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformationSection;
