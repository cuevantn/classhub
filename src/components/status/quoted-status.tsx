import { ProfileRecord } from "@/lib/xata";
import { StatusBody } from "./status-body";
import { anonymous } from "@/lib/defaults/anonymous";
import { getStatus } from "@/lib/queries/get-status";
import { ProfileAvatarHoverCard } from "../profile/profile-avatar";
import { ProfileHoverCard } from "../profile/profile-hover-card";
import { DateHoverCard } from "../date-hover-card";

const QuotedStatus = async ({ id }: { id: string | null }) => {
  if (!id) return null;
  const status = await getStatus(id);
  const author_profile = (status?.author_profile as ProfileRecord) || anonymous;
  if (!status) return null;

  return (
    <div className="mt-4 mb-2 flex space-x-4">
      <div className="grow-0">
        <div className="flex items-center">
          <div className="h-0.5 w-16 bg-muted"></div>
          <ProfileAvatarHoverCard profile={author_profile} size="small" />
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-2">
          <ProfileHoverCard
            profile={author_profile}
            className="text-xs font-bold hover:underline"
          >
            {author_profile.name}
          </ProfileHoverCard>
          <ProfileHoverCard profile={author_profile} className="text-xs">
            @{author_profile.handle}
          </ProfileHoverCard>
          {status.xata.createdAt && (
            <DateHoverCard date={status.xata.createdAt} className="text-xs" />
          )}
        </div>
        <StatusBody>{status.body}</StatusBody>
      </div>
    </div>
  );
};

export { QuotedStatus };
