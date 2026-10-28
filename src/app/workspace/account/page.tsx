import { AccountHeader } from "@/components/(dashboard)/account/account-header";
import { GuidanceCard } from "@/components/(dashboard)/account/guidance-card";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black text-[#EDEFFF] ">
      <AccountHeader />

      <GuidanceCard />
    </div>
  );
}
