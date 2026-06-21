import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";

interface ContributorCardProps {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export function ContributorCard({
  name,
  role,
  bio,
  avatar,
}: ContributorCardProps) {
  return (
    <div className="border-border bg-background flex flex-col items-center rounded-lg border p-6 text-center">
      <Avatar className="h-20 w-20">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-muted-foreground text-sm">{role}</p>
      {bio && <p className="text-muted-foreground mt-3 text-sm">{bio}</p>}
    </div>
  );
}
