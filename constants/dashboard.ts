  
  import { MdDashboard, MdEvent } from "react-icons/md";
  import { IoIosPeople } from "react-icons/io";
  import { BsFillPeopleFill } from "react-icons/bs";
  import { MdPersonAddAlt1 } from "react-icons/md";
  import { IoMdCalendar } from "react-icons/io";
  import { IoNotifications, IoSettingsSharp, IoPerson } from "react-icons/io5";
  import { IconType } from "react-icons";
  
  interface DashboardLink {
    label: string;
    href: string;
    icon: IconType;
  }
  
  export const MENTOR_DASHBOARD_LINKS: DashboardLink[] = [
    { label: "Dashboard", href: "/mentor", icon: MdDashboard },
    { label: "Mentor", href: "/mentor/mentors", icon: IoPerson },
    { label: "Communities", href: "/mentor/communities", icon: IoIosPeople },
    // { label: "Notifications", href: "/mentor/notifications", icon: IoNotifications },
    { label: "Events", href: "/mentor/events", icon: MdEvent },
    // { label: "Settings", href: "/mentor/settings", icon: IoSettingsSharp },
  ];

  export const ADMIN_DASHBOARD_LINKS = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: MdDashboard,
    },
    {
      label: "User Management",
      href: "/admin/dashboard/user-management",
      icon: MdPersonAddAlt1,
    },
    {
      label: "Community",
      href: "/admin/dashboard/community",
      icon: BsFillPeopleFill,
    },
    {
      label: "Event Management",
      href: "/admin/dashboard/event-management",
      icon: IoMdCalendar,
    },
  ]