import { LinkIcon } from "lucide-react";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { UserDetails } from "@/components/queries/users/get-user-details";

interface ProfileTabProps {
  user: UserDetails | null;
}

export default function ProfileTab({ user }: ProfileTabProps) {
  if (!user) return <div>No user data available</div>;
  
  const getSocialIcon = (type: number) => {
    switch (type) {
      case 1: // Facebook
      return <FaFacebook className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />;
      case 2: // Twitter
      return <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />;
      default: // LinkedIn or others
      return <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-base font-medium mb-2">About</h3>
        <p className="text-black font-light break-words">
          {user.summary || "No summary provided"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-2">Preferred Channel</h3>
          <p className="text-black font-light">
            {user.channels && user.channels.length > 0 
              ? user.channels.map(channel => channel.name).join(", ") 
              : "None specified"}
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Language</h3>
          <p className="text-black font-light">
            {user.languages && user.languages.length > 0 
              ? user.languages.map(lang => lang.name).join(", ") 
              : "None specified"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-black font-medium mb-2">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {user.expertises && user.expertises.length > 0 ? (
            user.expertises.map(expertise => (
              <span 
                key={expertise.id}
                className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800"
              >
                {expertise.name}
              </span>
            ))
          ) : (
            <span className="text-black font-light">No expertise specified</span>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Credentials</h3>
        <div className="flex flex-col md:flex-row gap-2 flex-wrap">
          {user.credentials && user.credentials.length > 0 ? (
            user.credentials.map(credential => (
              <a
                key={credential.id}
                href={credential.value.startsWith('http') ? credential.value : `https://${credential.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center max-w-full overflow-hidden"
              >
                <LinkIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{credential.value}</span>
              </a>
            ))
          ) : (
            <span className="text-black font-light">No credentials provided</span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Socials</h3>
        <div className="flex gap-2 flex-wrap">
          {user.socialMedia && user.socialMedia.length > 0 ? (
            user.socialMedia.map(social => (
              <a 
                key={social.id}
                href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-1 items-center mr-4"
              >
                {getSocialIcon(social.socialMediaType)}
                <span>{social.handle || social.url.split('/').pop() || 'Profile'}</span>
              </a>
            ))
          ) : (
            <span className="text-black font-light">No social media profiles provided</span>
          )}
        </div>
      </div>
    </div>
  );
}
