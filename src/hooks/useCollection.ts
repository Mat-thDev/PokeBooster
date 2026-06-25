import { myCollectionAtom } from "@/store/atom";
import { useAtom } from "jotai";

const useCollection = () => {
    const [myCollection, setMyCollection] = useAtom(myCollectionAtom);

    const updateCollection = async (setId: string, cardId: string) => {
        setMyCollection((prevCollection) => {
            const currentSetCards = prevCollection[setId] ?? [];

            if (currentSetCards.includes(cardId)) {
                return prevCollection;
            }

            return {
                ...prevCollection,
                [setId]: [...currentSetCards, cardId],
            };
        });
    };

    const collectedCardsAmount = (setId: string) => {
        return myCollection[setId] ? myCollection[setId].length : 0;
    }

    const hasCard = (setId: string, cardId: string): boolean => {
        return myCollection[setId]?.includes(cardId) ?? false;
    };

    return {
        collection: myCollection,
        updateCollection,
        collectedCardsAmount,
        hasCard,
    };
};

export default useCollection;