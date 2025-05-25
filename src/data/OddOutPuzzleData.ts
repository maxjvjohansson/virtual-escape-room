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
        theme: 'Hard objects',
        images: [
            {
                id: "cauldron",
                src: "/images/OddOut/cauldron.png",
                alt: "Cauldron",
                isOddOne: false
            },
            {
                id: "eyeball",
                src: "/images/OddOut/eyeball.png",
                alt: "Eyeball",
                isOddOne: true
            },
            {
                id: "scull",
                src: "/images/OddOut/scull.png",
                alt: "Scull",
                isOddOne: false
            },
            {
                id: "pumpkin",
                src: "/images/OddOut/pumpkin.png",
                alt: "Pumpkin",
                isOddOne: false
            },
            {
                id: "broom",
                src: "/images/OddOut/broom.png",
                alt: "Broom",
                isOddOne: false
            }
        ]
    },
    {
        theme: 'Nocturnal animals 3',
        images: [
            {
                id: "black-hat",
                src: "/images/OddOut/black-hat.png",
                alt: "Black hat",
                isOddOne: false
            },
            {
                id: "chalice",
                src: "/images/OddOut/chalice.png",
                alt: "Chalice",
                isOddOne: false
            },
            {
                id: "finger",
                src: "/images/OddOut/finger.png",
                alt: "Finger",
                isOddOne: true
            },
            {
                id: "candle",
                src: "/images/OddOut/candle.png",
                alt: "Candle",
                isOddOne: false
            },
            {
                id: "gravestone",
                src: "/images/OddOut/gravestone.png",
                alt: "Gravestone",
                isOddOne: false
            }
        ]
    }
];

export function getRandomOddOutSet(): OddOutImageSet {
    const randomIndex = Math.floor(Math.random() * OddOutSets.length);
    return OddOutSets[randomIndex];
}