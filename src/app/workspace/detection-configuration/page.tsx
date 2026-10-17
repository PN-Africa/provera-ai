import { DetectionHeader } from "@/components/detection-configuration/detection-header";
import { DetectionRulesForm } from "@/components/detection-configuration/detection-rules-form";

export default function DetectionConfigurationPage() {
  return (
    <div className="min-h-screen bg-black px-10 py-10 text-[#EDEFFF]">
      <DetectionHeader />

      <DetectionRulesForm />
    </div>
  );
}
