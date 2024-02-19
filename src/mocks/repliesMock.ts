import { Comment } from '@models/comment';
import usersMock from '@data/usersNewMock';
import { defaultUser } from '@models/defaults';

const repliesMock: Comment[] = [
    {
        "id": "101",
        "user": usersMock.find(u => u?.id === "3") || defaultUser,
        "parentTweetId": "1",
        "content": "That sounds like a wonderful experience!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
        "id": "102",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "2",
        "content": "VR technology is indeed fascinating!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    {
        "id": "103",
        "user": usersMock.find(u => u?.id === "4") || defaultUser,
        "parentTweetId": "3",
        "content": "I love exploring downtown areas too!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    },
    {
        "id": "104",
        "user": usersMock.find(u => u?.id === "2") || defaultUser,
        "parentTweetId": "4",
        "content": "Historical museums are always full of surprises.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
    },
    {
        "id": "105",
        "user": usersMock.find(u => u?.id === "1") || defaultUser,
        "parentTweetId": "5",
        "content": "Your artwork is really inspiring!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
        "id": "106",
        "user": usersMock.find(u => u?.id === "7") || defaultUser,
        "parentTweetId": "6",
        "content": "Congratulations on your new record!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 6)
    },
    {
        "id": "107",
        "user": usersMock.find(u => u?.id === "9") || defaultUser,
        "parentTweetId": "7",
        "content": "I'd love to know more about the band you discovered.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    },
    {
        "id": "108",
        "user": usersMock.find(u => u?.id === "8") || defaultUser,
        "parentTweetId": "8",
        "content": "I'm always looking for new book recommendations too.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
    },
    {
        "id": "109",
        "user": usersMock.find(u => u?.id === "6") || defaultUser,
        "parentTweetId": "9",
        "content": "That view must have been breathtaking!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 9)
    },
    {
        "id": "110",
        "user": usersMock.find(u => u?.id === "10") || defaultUser,
        "parentTweetId": "10",
        "content": "Homecooked meals are the best!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
    },
    {
        "id": "111",
        "user": usersMock.find(u => u?.id === "12") || defaultUser,
        "parentTweetId": "11",
        "content": "yo fui al dique a correr con alfonsin",
        "createdAt": new Date(Date.now())
    },
    {
        "id": "112",
        "user": usersMock.find(u => u?.id === "3") || defaultUser,
        "parentTweetId": "12",
        "content": "Space exploration is truly fascinating!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 11)
    },
    {
        "id": "113",
        "user": usersMock.find(u => u?.id === "2") || defaultUser,
        "parentTweetId": "13",
        "content": "Art has a unique way of expressing emotions.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 12)
    },
    {
        "id": "114",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "14",
        "content": "Indie music has a special charm!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 13)
    },
    {
        "id": "115",
        "user": usersMock.find(u => u?.id === "9") || defaultUser,
        "parentTweetId": "15",
        "content": "A good book and coffee, the perfect combination!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
    },
    {
        "id": "116",
        "user": usersMock.find(u => u?.id === "10") || defaultUser,
        "parentTweetId": "16",
        "content": "The mountains hold a special place in my heart.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 15)
    },
    {
        "id": "117",
        "user": usersMock.find(u => u?.id === "11") || defaultUser,
        "parentTweetId": "17",
        "content": "What's your favorite track from the new album?",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 16)
    },
    {
        "id": "118",
        "user": usersMock.find(u => u?.id === "3") || defaultUser,
        "parentTweetId": "18",
        "content": "I'd love to hear your book recommendations!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 17)
    },
    {
        "id": "119",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "19",
        "content": "Space exploration always leaves me in awe!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 18)
    },
    {
        "id": "120",
        "user": usersMock.find(u => u?.id === "7") || defaultUser,
        "parentTweetId": "20",
        "content": "Your cooking adventures look delicious!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 19)
    },
    {
        "id": "121",
        "user": usersMock.find(u => u?.id === "4") || defaultUser,
        "parentTweetId": "21",
        "content": "History has many lessons for us.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)
    },
    {
        "id": "122",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "22",
        "content": "Art is a beautiful way to express creativity.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 21)
    },
    {
        "id": "123",
        "user": usersMock.find(u => u?.id === "7") || defaultUser,
        "parentTweetId": "23",
        "content": "Indie music has a unique vibe!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 22)
    },
    {
        "id": "124",
        "user": usersMock.find(u => u?.id === "8") || defaultUser,
        "parentTweetId": "24",
        "content": "Books and coffee, my perfect companions.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 23)
    },
    {
        "id": "125",
        "user": usersMock.find(u => u?.id === "9") || defaultUser,
        "parentTweetId": "25",
        "content": "Mountains provide a sense of peace.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 24)
    },
    {
        "id": "126",
        "user": usersMock.find(u => u?.id === "10") || defaultUser,
        "parentTweetId": "11",
        "content": "Bailar es una expresión de alegría.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 25)
    },
    {
        "id": "127",
        "user": usersMock.find(u => u?.id === "11") || defaultUser,
        "parentTweetId": "12",
        "content": "Space exploration opens new horizons!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 26)
    },
    {
        "id": "128",
        "user": usersMock.find(u => u?.id === "3") || defaultUser,
        "parentTweetId": "13",
        "content": "Art is a universal language.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 27)
    },
    {
        "id": "129",
        "user": usersMock.find(u => u?.id === "2") || defaultUser,
        "parentTweetId": "14",
        "content": "Indie music has a unique charm!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 28)
    },
    {
        "id": "130",
        "user": usersMock.find(u => u?.id === "1") || defaultUser,
        "parentTweetId": "15",
        "content": "Coffee and a good book, my ideal evening!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 29)
    },
    {
        "id": "131",
        "user": usersMock.find(u => u?.id === "4") || defaultUser,
        "parentTweetId": "16",
        "content": "The beauty of mountains is unparalleled.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    },
    {
        "id": "132",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "17",
        "content": "Music always brings people together.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 31)
    },
    {
        "id": "133",
        "user": usersMock.find(u => u?.id === "7") || defaultUser,
        "parentTweetId": "18",
        "content": "Reading is a journey of the mind.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 32)
    },
    {
        "id": "134",
        "user": usersMock.find(u => u?.id === "8") || defaultUser,
        "parentTweetId": "19",
        "content": "Space exploration inspires us all.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 33)
    },
    {
        "id": "135",
        "user": usersMock.find(u => u?.id === "9") || defaultUser,
        "parentTweetId": "20",
        "content": "Cooking brings joy to the heart.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 34)
    },
    {
        "id": "136",
        "user": usersMock.find(u => u?.id === "10") || defaultUser,
        "parentTweetId": "21",
        "content": "La historia tiene mucho que enseñarnos.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 35)
    },
    {
        "id": "137",
        "user": usersMock.find(u => u?.id === "11") || defaultUser,
        "parentTweetId": "22",
        "content": "Exploring the world of indie music is fascinating!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 36)
    },
    {
        "id": "138",
        "user": usersMock.find(u => u?.id === "12") || defaultUser,
        "parentTweetId": "23",
        "content": "Bueno, me alegro por ti!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 37)
    },
    {
        "id": "139",
        "user": usersMock.find(u => u?.id === "3") || defaultUser,
        "parentTweetId": "24",
        "content": "I agree, books and coffee are a perfect combo!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 38)
    },
    {
        "id": "140",
        "user": usersMock.find(u => u?.id === "5") || defaultUser,
        "parentTweetId": "25",
        "content": "The serenity of mountains is incomparable.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 39)
    },
    {
        "id": "141",
        "user": usersMock.find(u => u?.id === "6") || defaultUser,
        "parentTweetId": "26",
        "content": "Keep setting new records, you're amazing!",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 40)
    },
    {
        "id": "142",
        "user": usersMock.find(u => u?.id === "7") || defaultUser,
        "parentTweetId": "27",
        "content": "Music connects people in profound ways.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 41)
    },
    {
        "id": "143",
        "user": usersMock.find(u => u?.id === "8") || defaultUser,
        "parentTweetId": "28",
        "content": "I'm always in search of a good book.",
        "createdAt": new Date(Date.now() - 1000 * 60 * 60 * 24 * 42)
    },
    {
        "id": "144",
        "user": usersMock.find(u => u?.id ==="11") || defaultUser,
        "parentTweetId": "12",
        "content": "I mean, Space exploration is truly fascinating!",
        "createdAt": new Date(Date.now() - 10 * 60 * 60 * 24 * 43)
    }
];

export default repliesMock;
