import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AssessmentFormData } from "../types";
import InsuranceCardUpload from "../InsuranceCardUpload";

interface DemographicsSectionProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
}

const DemographicsSection = ({ formData, onInputChange }: DemographicsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 2: Individual Demographics & Background</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comprehensive background information helps us tailor the intervention approach and treatment recommendations.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Identification */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="fullName">Full Legal Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => onInputChange("fullName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Current Age *</Label>
              <Input
                id="age"
                type="number"
                min="12"
                max="100"
                value={formData.age}
                onChange={(e) => onInputChange("age", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => onInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(v) => onInputChange("gender", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="transgender-male">Transgender Male</SelectItem>
                  <SelectItem value="transgender-female">Transgender Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Social/Economic Status */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Social & Economic Background</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Marital Status</Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(v) => onInputChange("maritalStatus", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single, never married</SelectItem>
                  <SelectItem value="dating">In a relationship/dating</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="domestic-partnership">Domestic partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Employment Status</Label>
              <Select
                value={formData.employmentStatus}
                onValueChange={(v) => onInputChange("employmentStatus", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed-full">Employed Full-time</SelectItem>
                  <SelectItem value="employed-part">Employed Part-time</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed-seeking">Unemployed, seeking work</SelectItem>
                  <SelectItem value="unemployed-not-seeking">Unemployed, not seeking</SelectItem>
                  <SelectItem value="disabled">Disabled/Unable to work</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="homemaker">Homemaker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Occupation/Profession</Label>
              <Input
                id="occupation"
                placeholder="e.g., Construction worker, Nurse, Attorney"
                value={formData.occupation}
                onChange={(e) => onInputChange("occupation", e.target.value)}
              />
            </div>
            <div>
              <Label>Highest Education Level</Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(v) => onInputChange("educationLevel", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-hs">Less than high school</SelectItem>
                  <SelectItem value="some-hs">Some high school</SelectItem>
                  <SelectItem value="hs-diploma">High school diploma/GED</SelectItem>
                  <SelectItem value="some-college">Some college</SelectItem>
                  <SelectItem value="associates">Associate's degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's degree</SelectItem>
                  <SelectItem value="masters">Master's degree</SelectItem>
                  <SelectItem value="doctorate">Doctorate/Professional degree</SelectItem>
                  <SelectItem value="trade-school">Trade/Vocational school</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Living Situation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Living Situation</h3>
          
          <div>
            <Label>Current Living Arrangement</Label>
            <Select
              value={formData.livingSituation}
              onValueChange={(v) => onInputChange("livingSituation", v)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select living situation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="own-home">Owns home</SelectItem>
                <SelectItem value="renting">Renting apartment/house</SelectItem>
                <SelectItem value="with-family">Living with family members</SelectItem>
                <SelectItem value="with-partner">Living with partner/spouse</SelectItem>
                <SelectItem value="with-roommates">Living with roommates</SelectItem>
                <SelectItem value="sober-living">Sober living/halfway house</SelectItem>
                <SelectItem value="shelter">Shelter</SelectItem>
                <SelectItem value="homeless">Homeless/No fixed address</SelectItem>
                <SelectItem value="hotel">Hotel/Motel</SelectItem>
                <SelectItem value="institution">Institution (jail, hospital, etc.)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Veteran Status</Label>
            <RadioGroup
              value={formData.veteranStatus}
              onValueChange={(v) => onInputChange("veteranStatus", v)}
              className="flex flex-wrap gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="vet-no" />
                <Label htmlFor="vet-no" className="font-normal">Not a veteran</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="vet-yes" />
                <Label htmlFor="vet-yes" className="font-normal">Veteran</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="vet-active" />
                <Label htmlFor="vet-active" className="font-normal">Active duty</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reserve" id="vet-reserve" />
                <Label htmlFor="vet-reserve" className="font-normal">Reserve/National Guard</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Additional Demographics */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Input
                id="primaryLanguage"
                placeholder="e.g., English, Spanish"
                value={formData.primaryLanguage}
                onChange={(e) => onInputChange("primaryLanguage", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ethnicity">Ethnicity/Cultural Background</Label>
              <Input
                id="ethnicity"
                placeholder="Optional"
                value={formData.ethnicity}
                onChange={(e) => onInputChange("ethnicity", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Insurance Card Upload */}
        <div className="pt-4 border-t">
          <InsuranceCardUpload
            frontUrl={formData.insuranceCardFrontUrl}
            backUrl={formData.insuranceCardBackUrl}
            onUpload={onInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicsSection;
