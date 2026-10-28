import { ActivityList } from "@/components/(dashboard)/platform-activity/activity-list";
import { PlatformActivityHeader } from "@/components/(dashboard)/platform-activity/platform-activity-header";

export default function PlatformActivityPage() {
  return (
    <div className="min-h-screen bg-black text-[#EDEFFF] ">
      <PlatformActivityHeader />

      <ActivityList />
    </div>
  );
}
