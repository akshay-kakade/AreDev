interface Event {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string; 
}

export const events: Event[] = [
    {
        title: "DevCon 2026",
        image: "/images/event1.png",
        slug: "devcon-2026",
        location: "Moscone Center, San Francisco",
        date: "March 15-17, 2026",
        time: "9:00 AM - 6:00 PM PST"
    },
    {
        title: "ReactWorld Conference",
        image: "/images/event2.png",
        slug: "reactworld-conference-2026",
        location: "RAI Amsterdam Convention Centre",
        date: "April 5-7, 2026",
        time: "10:00 AM - 7:00 PM CEST"
    },
    {
        title: "Global AI Summit",
        image: "/images/event3.png",
        slug: "global-ai-summit-2026",
        location: "Marina Bay Sands, Singapore",
        date: "May 20-22, 2026",
        time: "9:00 AM - 6:00 PM SGT"
    },
    {
        title: "HackTheWeb 2026",
        image: "/images/event4.png",
        slug: "hacktheweb-2026",
        location: "Station Berlin",
        date: "June 10-12, 2026",
        time: "10:00 AM - 10:00 PM CEST"
    },
    {
        title: "NextJS Conf",
        image: "/images/event5.png",
        slug: "nextjs-conf-2026",
        location: "The O2 Arena, London",
        date: "October 8-9, 2026",
        time: "9:00 AM - 6:00 PM BST"
    }
];