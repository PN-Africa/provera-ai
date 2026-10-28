import {
  Users,
  Database,
  ListChecks,
  SlidersHorizontal,
  Activity,
  Settings,
} from "lucide-react";
import { ManagementCard } from "./ManagementCard";

const sections = [
  {
    title: "Users & access",
    description: "Control who can view data and manage the workspace.",
    buttonLabel: "Manage users",
    href: "/admin/users-and-access",
    icon: Users,
  },
  {
    title: "Data sources",
    description: "Manage the inputs available for transaction analysis.",
    buttonLabel: "Manage sources",
    href: "/admin/data-sources",
    icon: Database,
  },
  {
    title: "Detection rules",
    description: "Set the indicators used to flag unusual transactions.",
    buttonLabel: "Manage rules",
    href: "/admin/detection-rules",
    icon: ListChecks,
  },
  {
    title: "Risk thresholds",
    description: "Choose how triggered indicators map to risk levels.",
    buttonLabel: "Adjust thresholds",
    href: "/admin/risk-thresholds",
    icon: SlidersHorizontal,
  },
  {
    title: "Platform activity",
    description: "Review access changes, configuration updates and analyses.",
    buttonLabel: "View activity",
    href: "/admin/platform-activity",
    icon: Activity,
  },
  {
    title: "Platform settings",
    description: "Update workspace details and default preferences.",
    buttonLabel: "Open settings",
    href: "/admin/platform-settings",
    icon: Settings,
  },
];

export function ManagementSections() {
  return (
    <section aria-label="Administrative management">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <ManagementCard
              key={section.title}
              title={section.title}
              description={section.description}
              buttonLabel={section.buttonLabel}
              href={section.href}
              icon={<Icon size={20} strokeWidth={1.7} />}
            />
          );
        })}
      </div>
    </section>
  );
}
