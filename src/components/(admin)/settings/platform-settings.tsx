import { WorkspaceSettingsForm } from "./workspace-settings-form";

export function PlatformSettings() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Platform settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#A8ADB8]">
          Manage the workspace details and defaults your team uses.
        </p>
      </header>

      <WorkspaceSettingsForm />
    </div>
  );
}
