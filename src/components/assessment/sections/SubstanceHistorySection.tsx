import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { AssessmentFormData, SubstanceEntry, SUBSTANCES_LIST, ROUTES_OF_ADMINISTRATION } from "../types";

interface SubstanceHistorySectionProps {
  formData: AssessmentFormData;
  onInputChange: (field: string, value: string) => void;
  substancesUsed: SubstanceEntry[];
  onSubstancesChange: (substances: SubstanceEntry[]) => void;
}

const SubstanceHistorySection = ({ 
  formData, 
  onInputChange,
  substancesUsed,
  onSubstancesChange
}: SubstanceHistorySectionProps) => {
  
  const addSubstance = () => {
    onSubstancesChange([...substancesUsed, {
      substance: "",
      ageFirstUsed: "",
      routeOfAdministration: "",
      frequency: "",
      lastUsed: "",
      currentlyUsing: false
    }]);
  };

  const removeSubstance = (index: number) => {
    onSubstancesChange(substancesUsed.filter((_, i) => i !== index));
  };

  const updateSubstance = (index: number, field: keyof SubstanceEntry, value: string | boolean) => {
    onSubstancesChange(substancesUsed.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 3: Comprehensive Substance Use History</CardTitle>
        <p className="text-sm text-muted-foreground">
          Understanding the complete picture of substance use helps determine appropriate level of care and treatment approach.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Substance */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Primary Substance of Concern</h3>
          
          <div>
            <Label htmlFor="primarySubstances">What substance(s) are you most concerned about? *</Label>
            <Textarea
              id="primarySubstances"
              placeholder="List all substances of concern (e.g., Alcohol and cocaine, Fentanyl and methamphetamine)"
              value={formData.primarySubstances}
              onChange={(e) => onInputChange("primarySubstances", e.target.value)}
              className="mt-2"
              required
            />
          </div>
        </div>

        {/* Detailed Substance Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Detailed Substance Use History</h3>
            <Button type="button" variant="outline" size="sm" onClick={addSubstance}>
              <Plus className="h-4 w-4 mr-1" /> Add Substance
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            List ALL substances your loved one has used, including alcohol, prescription medications (even if prescribed), and illicit drugs.
          </p>

          {substancesUsed.length > 0 && (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Substance</TableHead>
                    <TableHead>Age First Used</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-center">Current</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {substancesUsed.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={entry.substance}
                          onValueChange={(v) => updateSubstance(index, "substance", v)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {SUBSTANCES_LIST.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Age"
                          className="w-16"
                          value={entry.ageFirstUsed}
                          onChange={(e) => updateSubstance(index, "ageFirstUsed", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={entry.routeOfAdministration}
                          onValueChange={(v) => updateSubstance(index, "routeOfAdministration", v)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Route" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROUTES_OF_ADMINISTRATION.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={entry.frequency}
                          onValueChange={(v) => updateSubstance(index, "frequency", v)}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Freq" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily-multiple">Multiple times daily</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="several-week">Several times/week</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="occasional">Occasional/binges</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="e.g., Today, 2 days ago"
                          className="w-[120px]"
                          value={entry.lastUsed}
                          onChange={(e) => updateSubstance(index, "lastUsed", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={entry.currentlyUsing}
                          onCheckedChange={(checked) => updateSubstance(index, "currentlyUsing", checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubstance(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Use Patterns */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Use Patterns & Behaviors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Polysubstance Use (multiple substances at once)?</Label>
              <RadioGroup
                value={formData.polysubstanceUse}
                onValueChange={(v) => onInputChange("polysubstanceUse", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="poly-yes" />
                  <Label htmlFor="poly-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="poly-no" />
                  <Label htmlFor="poly-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unknown" id="poly-unknown" />
                  <Label htmlFor="poly-unknown" className="font-normal">Unknown</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>IV Drug Use (injection)?</Label>
              <RadioGroup
                value={formData.ivDrugUse}
                onValueChange={(v) => onInputChange("ivDrugUse", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="iv-current" />
                  <Label htmlFor="iv-current" className="font-normal">Current</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="past" id="iv-past" />
                  <Label htmlFor="iv-past" className="font-normal">Past</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="iv-never" />
                  <Label htmlFor="iv-never" className="font-normal">Never</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>History of Overdose?</Label>
              <RadioGroup
                value={formData.overdoseHistory}
                onValueChange={(v) => onInputChange("overdoseHistory", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="od-yes" />
                  <Label htmlFor="od-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="od-no" />
                  <Label htmlFor="od-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suspected" id="od-suspected" />
                  <Label htmlFor="od-suspected" className="font-normal">Suspected</Label>
                </div>
              </RadioGroup>
            </div>
            {formData.overdoseHistory === "yes" && (
              <div>
                <Label htmlFor="naloxoneReversals">Number of Narcan/Naloxone reversals</Label>
                <Input
                  id="naloxoneReversals"
                  type="number"
                  min="0"
                  value={formData.naloxoneReversals}
                  onChange={(e) => onInputChange("naloxoneReversals", e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>

          {formData.overdoseHistory === "yes" && (
            <div>
              <Label htmlFor="overdoseDetails">Overdose Details</Label>
              <Textarea
                id="overdoseDetails"
                placeholder="Describe circumstances, substances involved, medical intervention required..."
                value={formData.overdoseDetails}
                onChange={(e) => onInputChange("overdoseDetails", e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Behavioral Indicators */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Behavioral Indicators</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Morning use (to 'get going' or avoid withdrawal)?</Label>
              <RadioGroup
                value={formData.morningUse}
                onValueChange={(v) => onInputChange("morningUse", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="morning-yes" />
                  <Label htmlFor="morning-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="morning-no" />
                  <Label htmlFor="morning-no" className="font-normal">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unknown" id="morning-unknown" />
                  <Label htmlFor="morning-unknown" className="font-normal">Unknown</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Using alone vs. socially?</Label>
              <RadioGroup
                value={formData.usingAlone}
                onValueChange={(v) => onInputChange("usingAlone", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mostly-alone" id="alone-yes" />
                  <Label htmlFor="alone-yes" className="font-normal">Mostly alone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mostly-social" id="alone-no" />
                  <Label htmlFor="alone-no" className="font-normal">Mostly social</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="alone-both" />
                  <Label htmlFor="alone-both" className="font-normal">Both</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Hiding use from family/others?</Label>
              <RadioGroup
                value={formData.hidingUse}
                onValueChange={(v) => onInputChange("hidingUse", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hiding-yes" />
                  <Label htmlFor="hiding-yes" className="font-normal">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hiding-no" />
                  <Label htmlFor="hiding-no" className="font-normal">No/Open</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially" id="hiding-partial" />
                  <Label htmlFor="hiding-partial" className="font-normal">Partially</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>History of blackouts (memory gaps)?</Label>
              <RadioGroup
                value={formData.blackoutsHistory}
                onValueChange={(v) => onInputChange("blackoutsHistory", v)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="frequently" id="blackout-freq" />
                  <Label htmlFor="blackout-freq" className="font-normal">Frequently</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="blackout-occ" />
                  <Label htmlFor="blackout-occ" className="font-normal">Occasionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="blackout-no" />
                  <Label htmlFor="blackout-no" className="font-normal">Never</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Duration and Progression */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Duration & Progression</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ageFirstUsed">Age of First Use (any substance)</Label>
              <Input
                id="ageFirstUsed"
                type="number"
                min="5"
                max="100"
                value={formData.ageFirstUsed}
                onChange={(e) => onInputChange("ageFirstUsed", e.target.value)}
              />
            </div>
            <div>
              <Label>Duration of Problematic Use</Label>
              <Select
                value={formData.durationOfUse}
                onValueChange={(v) => onInputChange("durationOfUse", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-6-months">Less than 6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="2-5-years">2-5 years</SelectItem>
                  <SelectItem value="5-10-years">5-10 years</SelectItem>
                  <SelectItem value="10-20-years">10-20 years</SelectItem>
                  <SelectItem value="20-plus-years">20+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Longest Period of Sobriety</Label>
              <Select
                value={formData.longestSobrietyPeriod}
                onValueChange={(v) => onInputChange("longestSobrietyPeriod", v)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never-sober">Never been sober</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="1-2-years">1-2 years</SelectItem>
                  <SelectItem value="2-5-years">2-5 years</SelectItem>
                  <SelectItem value="5-plus-years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Has use increased/escalated over time?</Label>
            <RadioGroup
              value={formData.useIncreased}
              onValueChange={(v) => onInputChange("useIncreased", v)}
              className="flex flex-wrap gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="significantly" id="inc-sig" />
                <Label htmlFor="inc-sig" className="font-normal">Significantly increased</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="somewhat" id="inc-some" />
                <Label htmlFor="inc-some" className="font-normal">Somewhat increased</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stable" id="inc-stable" />
                <Label htmlFor="inc-stable" className="font-normal">Stable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decreased" id="inc-dec" />
                <Label htmlFor="inc-dec" className="font-normal">Decreased recently</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="typicalDailyUse">Describe typical daily use pattern</Label>
            <Textarea
              id="typicalDailyUse"
              placeholder="e.g., Drinks 12+ beers starting at noon, uses cocaine on weekends, takes pills every 4 hours..."
              value={formData.typicalDailyUse}
              onChange={(e) => onInputChange("typicalDailyUse", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubstanceHistorySection;
