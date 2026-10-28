import { DetectionHeader } from "@/components/(dashboard)/detection-configuration/detection-header";
import { DetectionRulesForm } from "@/components/(dashboard)/detection-configuration/detection-rules-form";

export default function DetectionConfigurationPage() {
  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <DetectionHeader />

      <DetectionRulesForm />
    </div>
  );
}
