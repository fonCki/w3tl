// src/mocks/tweetsMock.ts
import { Tweet } from '@models/tweet';
import usersMock from '@data/usersMock';
import { defaultUser } from '@models/defaults';

export const tweetsMock: Tweet[] = [
    {
        id: 1,
        user: usersMock.find(u => u?.id === 1) || defaultUser,
        content: "Just had an amazing hike today! #nature",
        image: "https://source.unsplash.com/random/800x600?nature",
        likes: 120,
        retweets: 40,
        comments: 15,
        createdAt: new Date("2023-08-01T10:00:00Z")
    },
    {
        id: 2,
        user: usersMock.find(u => u?.id === 2) || defaultUser,
        content: "Excited about the new VR technology! #technology",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        likes: 200,
        retweets: 100,
        comments: 50,
        createdAt: new Date("2023-08-02T14:30:00Z")
    },
    {
        id: 3,
        user: usersMock.find(u => u?.id === 11) || defaultUser,
        content: "Exploring downtown, so much to see! #citylife",
        likes: 95,
        retweets: 60,
        comments: 22,
        createdAt: new Date("2023-08-03T09:20:00Z")
    },
    {
        id: 4,
        user: usersMock.find(u => u?.id === 4) || defaultUser,
        content: "Visited the historical museum today, incredible experience! #history",
        image: "https://source.unsplash.com/random/800x600?museum",
        likes: 150,
        retweets: 90,
        comments: 35,
        createdAt: new Date("2023-08-04T16:45:00Z")
    },
    {
        id: 5,
        user: usersMock.find(u => u?.id === 5) || defaultUser,
        content: "Latest artwork progress, feeling inspired. #art",
        image: "https://source.unsplash.com/random/800x600?art",
        likes: 180,
        retweets: 120,
        comments: 42,
        createdAt: new Date("2023-08-05T13:30:00Z")
    },
    {
        id: 6,
        user: usersMock.find(u => u?.id === 6) || defaultUser,
        content: "Best run ever today, broke my own record! #fitness",
        image: "https://source.unsplash.com/random/800x600?running",
        likes: 110,
        retweets: 50,
        comments: 20,
        createdAt: new Date("2023-08-06T08:10:00Z")
    },
    {
        id: 7,
        user: usersMock.find(u => u?.id === 7) || defaultUser,
        content: "Discovered an amazing new band this weekend! #music",
        video: "https://www.youtube.com/watch?v=nfs8NYg7yQM",
        likes: 140,
        retweets: 80,
        comments: 30,
        createdAt: new Date("2023-08-07T19:00:00Z")
    },
    {
        id: 8,
        user: usersMock.find(u => u?.id === 11) || defaultUser,
        content: "Finished another great book, any recommendations? #reading",
        image: "https://source.unsplash.com/random/800x600?books",
        likes: 75,
        retweets: 40,
        comments: 18,
        createdAt: new Date("2023-08-08T21:15:00Z")
    },
    {
        id: 9,
        user: usersMock.find(u => u?.id === 9) || defaultUser,
        content: "Spectacular view from the mountain top! with @alfonsoridao #hiking",
        image: "https://source.unsplash.com/random/800x600?mountain",
        likes: 160,
        retweets: 70,
        comments: 25,
        createdAt: new Date("2023-08-09T07:30:00Z")
    },
    {
        id: 10,
        user: usersMock.find(u => u?.id === 11) || defaultUser,
        content: "Delicious homemade meal! #cooking",
        image: "https://source.unsplash.com/random/800x600?food",
        likes: 130,
        retweets: 65,
        comments: 28,
        createdAt: new Date("2023-08-10T12:00:00Z")
    },
    {
        id: 11,
        user: usersMock.find(u => u?.id === 2) || defaultUser,
        content: "Exciting developments in space exploration. #space",
        video: "https://www.youtube.com/watch?v=udAL48P5NJU",
        likes: 220,
        retweets: 115,
        comments: 54,
        createdAt: new Date("2023-08-11T14:30:00Z")
    },
    {
        id: 12,
        user: usersMock.find(u => u?.id === 4) || defaultUser,
        content: "Reflecting on the lessons from history. #thoughts",
        image: "https://source.unsplash.com/random/800x600?history",
        likes: 105,
        retweets: 55,
        comments: 21,
        createdAt: new Date("2023-08-12T17:45:00Z")
    },
    {
        id: 13,
        user: usersMock.find(u => u?.id === 5) || defaultUser,
        content: "Art is a way of survival. #artlovers",
        image: "https://source.unsplash.com/random/800x600?painting",
        likes: 190,
        retweets: 130,
        comments: 46,
        createdAt: new Date("2023-08-13T15:20:00Z")
    },
    {
        id: 14,
        user: usersMock.find(u => u?.id === 7) || defaultUser,
        content: "Exploring the world of indie music. #indiemusic",
        video: "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
        likes: 165,
        retweets: 85,
        comments: 32,
        createdAt: new Date("2023-08-14T18:10:00Z")
    },
    {
        id: 15,
        user: usersMock.find(u => u?.id === 8) || defaultUser,
        content: "There's nothing like a good book and a cup of coffee. #relaxing",
        image: "https://source.unsplash.com/random/800x600?reading",
        likes: 85,
        retweets: 45,
        comments: 17,
        createdAt: new Date("2023-08-15T20:00:00Z")
    },
    {
        id: 16,
        user: usersMock.find(u => u?.id === 9) || defaultUser,
        content: "The view from the top is always worth it. #mountains",
        image: "https://source.unsplash.com/random/800x600?mountain",
        likes: 175,
        retweets: 75,
        comments: 26,
        createdAt: new Date("2023-08-16T09:30:00Z")
    },
    {
        id: 17,
        user: usersMock.find(u => u?.id === 10) || defaultUser,
        content: "New music from my favorite band! #music",
        video: "https://www.youtube.com/watch?v=6FOUqQt3Kg0",
        likes: 155,
        retweets: 95,
        comments: 36,
        createdAt: new Date("2023-08-17T19:00:00Z")
    },
    {
        id: 18,
        user: usersMock.find(u => u?.id === 11) || defaultUser,
        content: "Just finished reading this amazing book! #reading",
        image: "https://source.unsplash.com/random/800x600?books",
        likes: 90,
        retweets: 60,
        comments: 23,
        createdAt: new Date("2023-08-18T21:15:00Z")
    },
    {
        id: 19,
        user: usersMock.find(u => u?.id === 2) || defaultUser,
        content: "The latest news from NASA. #space",
        video: "https://www.youtube.com/watch?v=Z4oLrfTO8uY",
        likes: 205,
        retweets: 105,
        comments: 52,
        createdAt: new Date("2023-08-19T14:30:00Z")
    },
    {
        id: 20,
        user: usersMock.find(u => u?.id === 11) || defaultUser,
        content: "Trying out new recipes this weekend. #homecooking",
        image: "https://source.unsplash.com/random/800x600?cooking",
        likes: 142,
        retweets: 73,
        comments: 31,
        createdAt: new Date("2023-08-20T13:30:00Z")
    },
    {
        id: 21,
        user: usersMock.find(u => u?.id === 4) || defaultUser,
        content: "The lessons of history teach us many things. #history",
        image: "https://source.unsplash.com/random/800x600?history",
        likes: 125,
        retweets: 65,
        comments: 24,
        createdAt: new Date("2023-08-21T17:45:00Z")
    },
    {
        id: 22,
        user: usersMock.find(u => u?.id === 5) || defaultUser,
        content: "Art is a way of survival. #artlovers",
        image: "https://source.unsplash.com/random/800x600?art",
        likes: 195,
        retweets: 135,
        comments: 48,
        createdAt: new Date("2023-08-22T15:20:00Z")
    },
    {
        id: 23,
        user: usersMock.find(u => u?.id === 7) || defaultUser,
        content: "Discovered an amazing new band this weekend! #music",
        video: "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
        likes: 170,
        retweets: 90,
        comments: 33,
        createdAt: new Date("2023-08-23T18:10:00Z")
    },
    {
        id: 24,
        user: usersMock.find(u => u?.id === 8) || defaultUser,
        content: "There's nothing like a good book and a cup of coffee. #relaxing",
        image: "https://source.unsplash.com/random/800x600?reading",
        likes: 80,
        retweets: 50,
        comments: 19,
        createdAt: new Date("2023-08-24T20:00:00Z")
    },
    {
        id: 25,
        user: usersMock.find(u => u?.id === 9) || defaultUser,
        content: "The view from the top is always worth it. #mountains",
        image: "https://source.unsplash.com/random/800x600?mountain",
        likes: 180,
        retweets: 80,
        comments: 27,
        createdAt: new Date("2023-08-25T09:30:00Z")
    },
    {
        id: 26,
        user: usersMock.find(u => u?.id === 10) || defaultUser,
        content: "Exploring the world of indie music. #indiemusic",
        video: "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
        likes: 175,
        retweets: 95,
        comments: 38,
        createdAt: new Date("2023-08-26T18:10:00Z")
    },
    {
        id: 27,
        user: usersMock.find(u => u?.id === 12) || defaultUser,
        content: "Sharing my latest dance performance. #dance",
        video: "https://www.youtube.com/watch?v=abcdefg",
        likes: 120,
        retweets: 65,
        comments: 29,
        createdAt: new Date("2023-08-27T21:00:00Z")
    },
    {
        id: 28,
        user: usersMock.find(u => u?.id === 13) || defaultUser,
        content: "Traveling to new destinations, stay tuned! #travel",
        image: "https://source.unsplash.com/random/800x600?travel",
        likes: 155,
        retweets: 75,
        comments: 35,
        createdAt: new Date("2023-08-28T08:45:00Z")
    },
    {
        id: 29,
        user: usersMock.find(u => u?.id === 14) || defaultUser,
        content: "Exploring the culinary world, one dish at a time. #foodie",
        image: "https://source.unsplash.com/random/800x600?food",
        likes: 180,
        retweets: 85,
        comments: 40,
        createdAt: new Date("2023-08-29T13:15:00Z")
    },
    {
        id: 30,
        user: usersMock.find(u => u?.id === 15) || defaultUser,
        content: "Gaming marathon this weekend! #gaming",
        video: "https://www.youtube.com/watch?v=123456",
        likes: 220,
        retweets: 110,
        comments: 48,
        createdAt: new Date("2023-08-30T16:20:00Z")
    },
    {
        id: 31,
        user: usersMock.find(u => u?.id === 16) || defaultUser,
        content: "Admiring the beauty of nature's creations. #naturelover",
        image: "https://source.unsplash.com/random/800x600?nature",
        likes: 150,
        retweets: 70,
        comments: 32,
        createdAt: new Date("2023-08-31T11:30:00Z")
    },
    {
        id: 32,
        user: usersMock.find(u => u?.id === 17) || defaultUser,
        content: "Supporting animal rights and conservation efforts. #animallover",
        image: "https://source.unsplash.com/random/800x600?animals",
        likes: 135,
        retweets: 60,
        comments: 25,
        createdAt: new Date("2023-09-01T09:10:00Z")
    },
    {
        id: 33,
        user: usersMock.find(u => u?.id === 18) || defaultUser,
        content: "Hiking through breathtaking trails. #hikingadventures",
        image: "https://source.unsplash.com/random/800x600?hiking",
        likes: 185,
        retweets: 95,
        comments: 38,
        createdAt: new Date("2023-09-02T14:45:00Z")
    },
    {
        id: 34,
        user: usersMock.find(u => u?.id === 19) || defaultUser,
        content: "Starting the day with a cup of freshly brewed coffee. #coffeeholic",
        image: "https://source.unsplash.com/random/800x600?coffee",
        likes: 90,
        retweets: 50,
        comments: 22,
        createdAt: new Date("2023-09-03T07:55:00Z")
    },
    {
        id: 35,
        user: usersMock.find(u => u?.id === 20) || defaultUser,
        content: "Reviewing the latest blockbuster movie. #moviereview",
        image: "https://source.unsplash.com/random/800x600?movie",
        likes: 155,
        retweets: 80,
        comments: 36,
        createdAt: new Date("2023-09-04T20:30:00Z")
    },
    {
        id: 36,
        user: usersMock.find(u => u?.id === 21) || defaultUser,
        content: "Creating beautiful crafts from scratch. #crafting",
        image: "https://source.unsplash.com/random/800x600?crafts",
        likes: 120,
        retweets: 60,
        comments: 28,
        createdAt: new Date("2023-09-05T12:20:00Z")
    },
    {
        id: 37,
        user: usersMock.find(u => u?.id === 22) || defaultUser,
        content: "Finding inner peace through yoga and meditation. #yogalife",
        image: "https://source.unsplash.com/random/800x600?yoga",
        likes: 145,
        retweets: 70,
        comments: 30,
        createdAt: new Date("2023-09-06T09:45:00Z")
    }

];

export default tweetsMock;
