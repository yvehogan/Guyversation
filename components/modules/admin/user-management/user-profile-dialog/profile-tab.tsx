import { LinkIcon } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function ProfileTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="text-base font-medium mb-2">About</h3>
        <p className="text-black font-light break-words">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat. Ut wisi enim adLorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim adLorem ipsum dolor sit amet,
          consectetur adipiscing
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-2">Preferred Channel</h3>
          <p className="text-black font-light">Chat, Video call</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Language</h3>
          <p className="text-black font-light">English, French</p>
        </div>
      </div>

      <div>
        <h3 className="text-black font-medium mb-2">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
            Boy-Child Advocate
          </span>
          <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
            Therapist
          </span>
          <span className="px-3 py-1 rounded-full text-sm border border-secondary-500 text-teal-600 bg-secondary-800">
            Tech Executive
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Credentials</h3>
        <div className="flex flex-col md:flex-row gap-2 flex-wrap">
          <a
            href="#"
            className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center max-w-full overflow-hidden"
          >
            <LinkIcon className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">https://www.magnuscarlsen.com</span>
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-full text-sm border border-primary-400 text-black bg-primary-200 flex items-center max-w-full overflow-hidden"
          >
            <LinkIcon className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">https://www.carlsenmagnus.com</span>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Socials</h3>
        <div className="flex gap-2">
          <a href="#" className="flex gap-1 items-center">
            <FaLinkedinIn className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
            Magnus
          </a>
          <a href="#" className="flex gap-1 items-center ml-4">
            <BsTwitterX className="h-5 w-5 bg-primary-400 text-white p-1 rounded-md" />
            Magnus
          </a>
        </div>
      </div>
    </div>
  );
}
