import {
    Building2,
    Stethoscope,
    CalendarClock,
    Users,
    LucideIcon,
  } from "lucide-react";

  // Types
export interface BusinessType {
    label: string;
    description: string;
    icon: LucideIcon;
    introText?: string;
  }

export const businessTypes: BusinessType[] = [
    {
      label: "Hotels",
      description: "Let's set up your hotel business",
      icon: Building2,
      introText: "Let's set up your hotel business",
    },
    {
      label: "Clinics",
      description: "Let's set up your medical clinic",
      icon: Stethoscope,
      introText: "Let's set up your medical clinic",
    },
    {
      label: "Event Organizers",
      description:
        "Wedding Planners, Corporate Event Managers, Concert Organizers",
      icon: CalendarClock,
      introText: "Let's set up your event planning business",
    },
    {
      label: "Others",
      description:
        "For individuals, micro-businesses, or other industries like BFSI, IT, BPOs, etc.",
      icon: Users,
      introText: "Let's set up your business",
    },
  ];
