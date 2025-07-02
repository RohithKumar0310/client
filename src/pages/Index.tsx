
import { ESGMetrics } from "@/components/ESGMetrics";
import { ITMetrics } from "@/components/ITMetrics";
import { QuickStats } from "@/components/QuickStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <QuickStats />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ESGMetrics />
          <ITMetrics />
        </div>
      </div>
    </div>
  );
};

export default Index;
