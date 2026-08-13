import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Team Member</h1>
      <div className="mt-6">
        <TeamMemberForm action={createTeamMember} submitLabel="Create Team Member" />
      </div>
    </div>
  );
}
