import { AccountHeader } from "@/components/account/account-header";
import { GuidanceCard } from "@/components/account/guidance-card";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 text-[#EDEFFF] sm:px-6 lg:px-10 lg:py-10">
      <AccountHeader />

      <GuidanceCard />
    </div>
  );
}
