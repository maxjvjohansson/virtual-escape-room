export type OddOutImage = {
    id: string;
    src: string;
    alt: string;
    isOddOne: boolean;
};

export type OddOutImageSet = {
    theme: string;
    images: OddOutImage[];
};

export const OddOutSets : OddOutImageSet[] = [
    {
        theme: 'Nocturnal animals',
        images: [
            {
                id: "bat",
                src: "/images/OddOut/bat.png",
                alt: "Bat",
                isOddOne: false
            },
            {
                id: "hedgehog",
                src: "/images/OddOut/hedgehog.png",
                alt: "Hedgehog",
                isOddOne: false
            },
            {
                id: "crow",
                src: "/images/OddOut/crow.png",
                alt: "crow",
                isOddOne: true
            },
            {
                id: "fox",
                src: "/images/OddOut/fox.png",
                alt: "Fox",
                isOddOne: false
            },
            {
                id: "owl",
                src: "/images/OddOut/owl.png",
                alt: "Owl",
                isOddOne: false
            }
        ]
    },
    {
        theme: 'Nocturnal animals 2',
        images: [
            {
                id: "bat",
                src: "/images/OddOut/bat.jpeg",
                alt: "Bat",
                isOddOne: false
            },
            {
                id: "hedgehog",
                src: "/images/OddOut/hedgehog.jpeg",
                alt: "Hedgehog",
                isOddOne: false
            },
            {
                id: "crow",
                src: "/images/OddOut/crow.jpeg",
                alt: "crow",
                isOddOne: true
            },
            {
                id: "fox",
                src: "/images/OddOut/fox.jpeg",
                alt: "Fox",
                isOddOne: false
            },
            {
                id: "owl",
                src: "/images/OddOut/owl.jpeg",
                alt: "Owl",
                isOddOne: false
            }
        ]
    },
    {
        theme: 'Nocturnal animals 3',
        images: [
            {
                id: "bat",
                src: "/images/OddOut/bat.jpeg",
                alt: "Bat",
                isOddOne: false
            },
            {
                id: "hedgehog",
                src: "/images/OddOut/hedgehog.jpeg",
                alt: "Hedgehog",
                isOddOne: false
            },
            {
                id: "crow",
                src: "/images/OddOut/crow.jpeg",
                alt: "crow",
                isOddOne: true
            },
            {
                id: "fox",
                src: "/images/OddOut/fox.jpeg",
                alt: "Fox",
                isOddOne: false
            },
            {
                id: "owl",
                src: "/images/OddOut/owl.jpeg",
                alt: "Owl",
                isOddOne: false
            }
        ]
    }
];

export function getRandomOddOutSet(): OddOutImageSet {
    const randomIndex = Math.floor(Math.random() * OddOutSets.length);
    return OddOutSets[randomIndex];
}