import { WorkspaceUnavailable } from "@/components/shared/workspace-unavailable";

export default function WorkspaceUnavailablePage() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 text-[#EDEFFF] sm:px-6 lg:px-10 lg:py-10">
      <div>
        <p className="font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
          Transaction Intelligence
        </p>

        <h1 className="mt-2 font-manrope text-[40px] font-bold leading-[48px] tracking-[-0.4px] text-[#EDEFFF]">
          Workspace unavailable
        </h1>

        <p className="mt-2 font-sans text-[16px] font-normal leading-[24px] text-[#B7B9CB]">
          Your request could not be completed.
        </p>
      </div>

      <div className="mt-6">
        <WorkspaceUnavailable />
      </div>
    </div>
  );
}
