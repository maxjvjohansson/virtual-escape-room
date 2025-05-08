export type OddOutImage = {
    src: string;
    alt: string;
    isOddOne: boolean;
};

export type OddOutImageSet = {
    theme: string;
    images: OddOutImage[];
};

export const OddOutSets : OddOutImageSet[] = [
    //Set 1
    {
        theme: 'Nocternal animals',
        images: [
            {
                src: '/test/test.jpg',
                alt: "a test",
                isOddOne: false
            },
            {
                src: "/test/test2.jpg",
                alt: "another test of code",
                isOddOne: true
            }
        ]
    }
];