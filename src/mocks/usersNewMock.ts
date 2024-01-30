import { User } from '@models/user/user';

const usersMock: User[] = [
    {
        id: "1",
        username: "naturelover",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=1",
        email: "user1@example.com",
        name: "John",
        lastname: "Doe",
        createdAt: "2024-01-01",
        followersCount: 1000,
        followingCount: 500,
        bio: "Nature lover and hiker",
        location: "San Francisco, CA",
        website: "https://naturelover.com",
        background: "https://example.com/background1.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8"
    },
    {
        id: "2",
        username: "techguy",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=2",
        email: "user2@example.com",
        name: "Alice",
        lastname: "Smith",
        createdAt: "2024-01-02",
        followersCount: 800,
        followingCount: 300,
        bio: "Tech enthusiast and VR innovator",
        location: "Silicon Valley, CA",
        website: "https://techwizard.com",
        background: "https://example.com/background2.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aDd31E486fA8"
    },

    {
        id: "3",
        username: "cityexplorer",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=3",
        email: "user3@example.com",
        name: "David",
        lastname: "Brown",
        createdAt: "2024-01-01",
        followersCount: 1500,
        followingCount: 700,
        bio: "Urban explorer and street photographer",
        location: "New York, NY",
        website: "https://cityexplorer.com",
        background: "https://example.com/background3.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A9"
    },
    {
        id: "4",
        username: "historybuff",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "user4@example.com",
        name: "Sarah",
        lastname: "Johnson",
        createdAt: "2024-01-02",
        followersCount: 1200,
        followingCount: 900,
        bio: "History buff and museum geek",
        location: "London, UK",
        website: "https://historybuff.com",
        background: "https://example.com/background4.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B0"
    },
    {
        id: "5",
        username: "artenthusiast",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "user5@example.com",
        name: "Emma",
        lastname: "Williams",
        createdAt: "2024-01-03",
        followersCount: 900,
        followingCount: 400,
        bio: "Art enthusiast and gallery curator",
        location: "Paris, France",
        website: "https://artenthusiast.com",
        background: "https://example.com/background5.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B1"
    },
    {
        id: "6",
        username: "fitnessfreak",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=6",
        email: "user6@example.com",
        name: "Michael",
        lastname: "Jones",
        createdAt: "2024-01-04",
        followersCount: 2000,
        followingCount: 1500,
        bio: "Fitness coach and marathon runner",
        location: "Berlin, Germany",
        website: "https://fitnessfreak.com",
        background: "https://example.com/background6.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B2"
    },
    {
        id: "7",
        username: "musiclover",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=7",
        email: "user7@example.com",
        name: "Sophia",
        lastname: "Garcia",
        createdAt: "2024-01-05",
        followersCount: 700,
        followingCount: 350,
        bio: "Music lover, guitarist, and songwriter",
        location: "Nashville, TN",
        website: "https://musiclover.com",
        background: "https://example.com/background7.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B3"
    },
    {
        id: "8",
        username: "bookworm",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "user8@example.com",
        name: "Oliver",
        lastname: "Martinez",
        createdAt: "2024-01-06",
        followersCount: 600,
        followingCount: 200,
        bio: "Avid reader and aspiring author",
        location: "Boston, MA",
        website: "https://bookworm.com",
        background: "https://example.com/background8.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B4"
    },
    {
        id: "9",
        username: "adventureseeker",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=9",
        email: "user9@example.com",
        name: "Isabella",
        lastname: "Robinson",
        createdAt: "2024-01-07",
        followersCount: 1300,
        followingCount: 800,
        bio: "Adventurer and travel blogger",
        location: "Sydney, Australia",
        website: "https://adventureseeker.com",
        background: "https://example.com/background9.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B5"
    },
    {
        id: "10",
        username: "thisisus",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=10",
        email: "user10@example.com",
        name: "Ethan",
        lastname: "Clark",
        createdAt: "2024-01-08",
        followersCount: 2500,
        followingCount: 2000,
        bio: "Culinary enthusiast and food blogger",
        location: "Tandil, Argentina",
        website: "https://alfonso.ridao.ar",
        background: "https://example.com/background10.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B6"
    },
    {
        id: "11",
        username: "alfonsoridao",
        verified: true,
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocKhjPCUUYR4SLVcVW5V4yZpSYVYba9MxKEsGP3U5AubmHA=s96-c",
        email: "alfonso@ridao.ar",
        name: "Alfonso",
        lastname: "Ridao",
        createdAt: "2024-01-30",
        followersCount: 200,
        followingCount: 100,
        bio: "Me gusta bailar y hacer la vertical, Tambien actuo, pinto y escribo #Tech",
        location: "Buenos Aires",
        website: "https://alma.com.ar",
        background: "https://example.com/background11.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B7"
    },
    {
        id: "12",
        username: "almita",
        verified: true,
        avatar: "",
        email: "almita@gmail.com",
        name: "Alma Isabel",
        lastname: "Serrano Ridao",
        createdAt: "2024-01-10",
        followersCount: 100,
        followingCount: 50,
        bio: "Culinary enthusiast and food blogger",
        location: "Tandil, Argentina",
        website: "https://alfonso.ridao.ar",
        background: "https://example.com/background12.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B8"
    },
    {
        id: "13",
        username: "travelbug",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=13",
        email: "user13@example.com",
        name: "William",
        lastname: "Anderson",
        createdAt: "2024-01-11",
        followersCount: 1800,
        followingCount: 900,
        bio: "Traveler and wanderlust enthusiast",
        location: "Miami, FL",
        website: "https://travelbug.com",
        background: "https://example.com/background13.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486B9"
    },
    {
        id: "14",
        username: "foodie",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=14",
        email: "user14@example.com",
        name: "Sophie",
        lastname: "Taylor",
        createdAt: "2024-01-12",
        followersCount: 1600,
        followingCount: 800,
        bio: "Foodie and culinary explorer",
        location: "Los Angeles, CA",
        website: "https://foodieadventures.com",
        background: "https://example.com/background14.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C0"
    },
    {
        id: "15",
        username: "gamer",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=15",
        email: "user15@example.com",
        name: "James",
        lastname: "Wilson",
        createdAt: "2024-01-13",
        followersCount: 2200,
        followingCount: 1100,
        bio: "Gamer and esports fanatic",
        location: "Seattle, WA",
        website: "https://gamerworld.com",
        background: "https://example.com/background15.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C1"
    },
    {
        id: "16",
        username: "gardener",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=16",
        email: "user16@example.com",
        name: "Mia",
        lastname: "Davis",
        createdAt: "2024-01-14",
        followersCount: 1200,
        followingCount: 600,
        bio: "Botanist and plant lover",
        location: "Portland, OR",
        website: "https://plantlover.com",
        background: "https://example.com/background16.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C2"
    },
    {
        id: "17",
        username: "petlover",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=17",
        email: "user17@example.com",
        name: "Liam",
        lastname: "Miller",
        createdAt: "2024-01-15",
        followersCount: 1700,
        followingCount: 850,
        bio: "Animal rights activist and pet lover",
        location: "Denver, CO",
        website: "https://animalrights.org",
        background: "https://example.com/background17.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C3"
    },
    {
        id: "18",
        username: "hikingenthusiast",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=18",
        email: "user18@example.com",
        name: "Ava",
        lastname: "Moore",
        createdAt: "2024-01-16",
        followersCount: 1400,
        followingCount: 700,
        bio: "Outdoor enthusiast and hiking guide",
        location: "Salt Lake City, UT",
        website: "https://outdoorenthusiast.com",
        background: "https://example.com/background18.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C4"
    },
    {
        id: "19",
        username: "coffeelover",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=19",
        email: "user19@example.com",
        name: "Noah",
        lastname: "Gonzalez",
        createdAt: "2024-01-17",
        followersCount: 1900,
        followingCount: 950,
        bio: "Coffee connoisseur and barista",
        location: "Austin, TX",
        website: "https://coffeeaddict.com",
        background: "https://example.com/background19.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C5"
    },
    {
        id: "20",
        username: "filmlover",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=20",
        email: "user20@example.com",
        name: "Sophie",
        lastname: "White",
        createdAt: "2024-01-18",
        followersCount: 2000,
        followingCount: 1000,
        bio: "Cinephile and movie critic",
        location: "Los Angeles, CA",
        website: "https://filmlover.com",
        background: "https://example.com/background20.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C6"
    },
    {
        id: "21",
        username: "techgeek",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=21",
        email: "user21@example.com",
        name: "Liam",
        lastname: "Wilson",
        createdAt: "2024-01-19",
        followersCount: 2200,
        followingCount: 1100,
        bio: "Tech enthusiast and gadget geek",
        location: "San Francisco, CA",
        website: "https://techgeek.com",
        background: "https://example.com/background21.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C7"
    },
    {
        id: "22",
        username: "fashionista",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=22",
        email: "user22@example.com",
        name: "Mia",
        lastname: "Davis",
        createdAt: "2024-01-20",
        followersCount: 1800,
        followingCount: 900,
        bio: "Fashion blogger and style icon",
        location: "New York, NY",
        website: "https://fashionista.com",
        background: "https://example.com/background22.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C8"
    },
    {
        id: "23",
        username: "startupfounder",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=23",
        email: "user23@example.com",
        name: "Oliver",
        lastname: "Martinez",
        createdAt: "2024-01-21",
        followersCount: 2200,
        followingCount: 1500,
        bio: "Entrepreneur and tech startup founder",
        location: "San Francisco, CA",
        website: "https://startupfounder.com",
        background: "https://example.com/background23.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486C9"
    },
    {
        id: "24",
        username: "fitnessguru",
        verified: true,
        avatar: "https://i.pravatar.cc/150?img=24",
        email: "user24@example.com",
        name: "Aria",
        lastname: "Lee",
        createdAt: "2024-01-30",
        followersCount: 3000,
        followingCount: 1500,
        bio: "Fitness guru and personal trainer",
        location: "Dallas, TX",
        website: "https://fitnessexpert.com",
        background: "https://example.com/background24.jpg",
        pub: "did:ethr:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486D0"
    }
];

export default usersMock;