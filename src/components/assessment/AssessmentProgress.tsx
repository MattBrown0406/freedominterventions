import { Check } from "lucide-react";

interface AssessmentProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
}

const AssessmentProgress = ({ currentSection, totalSections, sectionTitles }: AssessmentProgressProps) => {
  return (
    <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm border-b pb-4 pt-4 mb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Section {currentSection} of {totalSections}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((currentSection / totalSections) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentSection / totalSections) * 100}%` }}
          />
        </div>
        <p className="text-sm font-medium mt-2 text-foreground">
          {sectionTitles[currentSection - 1]}
        </p>
      </div>
    </div>
  );
};

export default AssessmentProgress;
