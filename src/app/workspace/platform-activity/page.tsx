import { ActivityList } from "@/components/platform-activity/activity-list";
import { PlatformActivityHeader } from "@/components/platform-activity/platform-activity-header";

export default function PlatformActivityPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 text-[#EDEFFF] sm:px-6 lg:px-10 lg:py-10">
      <PlatformActivityHeader />

      <ActivityList />
    </div>
  );
}
