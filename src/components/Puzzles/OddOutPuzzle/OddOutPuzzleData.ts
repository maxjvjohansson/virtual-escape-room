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
        theme: 'Nocturnal animals',
        images: [
            {
                src: '/public/images/OddOut/bat.jpeg',
                alt: "Bat",
                isOddOne: false
            },
            {
                src: '/public/images/OddOut/hedgehog.jpeg',
                alt: "Hedgehog",
                isOddOne: false
            },
            {
                src: '/public/images/OddOut/owl.jpeg',
                alt: "Owl",
                isOddOne: false
            },
            {
                src: '/public/images/OddOut/fox.jpeg',
                alt: "Fox",
                isOddOne: false
            },
            {
                src: '/public/images/OddOut/crow.jpeg',
                alt: "crow",
                isOddOne: true
            }
        ]
    }
];

export function getRandomOddOutSet(): OddOutImageSet {
    const randomIndex = Math.floor(Math.random() * OddOutSets.length);
    return OddOutSets[randomIndex];
  }
  
  /**
   * Validate that a puzzle set contains exactly one odd image
   */
  export function validatePuzzleSet(puzzleSet: OddOutImageSet): boolean {
    const oddOnesCount = puzzleSet.images.filter(img => img.isOddOne).length;
    return oddOnesCount === 1;
  }