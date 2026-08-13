import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateTeamMember, deleteTeamMember } from "../../actions";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) notFound();

  const boundUpdate = updateTeamMember.bind(null, member.id);
  const boundDelete = deleteTeamMember.bind(null, member.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Team Member</h1>
        <DeleteButton action={boundDelete} label="Delete Team Member" />
      </div>
      <div className="mt-6">
        <TeamMemberForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: member.slug,
            name: member.name,
            role: member.role,
            photoUrl: member.photoUrl,
            bio: member.bio,
            sortOrder: member.sortOrder,
            isPublished: member.isPublished,
          }}
        />
      </div>
    </div>
  );
}
