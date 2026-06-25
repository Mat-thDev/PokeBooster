import TCGdex, { Card, CardResume, SupportedLanguages } from '@tcgdex/sdk'


export class PokemonTCGService {
    private api: TCGdex

    constructor(lang: SupportedLanguages = "pt") {
        this.api = new TCGdex(lang);
        this.api.setCacheTTL(28800); // data doesnt change that frequently.
    }

    async getAllSets() {
        try {
            const sets = await this.api.fetch("sets");
            const allSets = sets ? sets.filter((s) => s.cardCount.official !== 0).reverse() : [];
            return allSets
        } catch (err) {
            console.error("Erro ao buscar coleções do Pokémon TCG:", err);
            throw new Error("Não foi possível carregar as coleções.");
        }
    }

    async getSet(serie: string) {
        try {
            const set = await this.api.fetch("sets", serie)
            return set;
        } catch (err) {
            console.error("Erro ao buscar coleção do Pokémon TCG:", err);
            throw new Error("Não foi possível carregar essa coleção.");
        }
    }

    async openBooster(amount: number, cards: CardResume[]) {
        try {
            let listCards: Card[] = [];
            await Promise.all(
                cards.map(async (c) => {
                    try {
                        const fullDetail = await this.api.card.get(c.id) as Card;
                        return listCards.push(fullDetail);
                    } catch { }
                })
            )

            const getRandomCard = (arr: Card[]) => arr[Math.floor(Math.random() * arr.length)];

            const isCommon = (r: string) => r === 'comum' || r === 'common';
            const isUncommon = (r: string) => r === 'incomum' || r === 'uncommon';
            const isRare = (r: string) => r === 'rara' || r === 'rare';

            const isMainHit = (r: string) =>
                r.includes('dupla') || r.includes('double') ||
                r.includes('ultra') ||
                r.includes('ilustração') || r.includes('illustration');

            const isGoldHit = (r: string) =>
                r.includes('mega') || r.includes('hiper') || r.includes('hyper') || r.includes('gold');


            const comuns = listCards.filter(c => isCommon(c.rarity ?? ''));
            const incomuns = listCards.filter(c => isUncommon(c.rarity ?? ''));
            const raras = listCards.filter(c => isRare(c.rarity ?? ''));
            const hitsPrincipais = listCards.filter(c => isMainHit(c.rarity ?? ''));
            const megaHiperRaras = listCards.filter(c => isGoldHit(c.rarity ?? ''));


            const poolRara = raras.length > 0 ? raras : listCards;
            const poolHits = hitsPrincipais.length > 0 ? hitsPrincipais : poolRara;
            const poolGold = megaHiperRaras.length > 0 ? megaHiperRaras : poolHits;
            const poolReverse = [...comuns, ...incomuns, ...poolRara];

            const openedBoosters: Card[][] = [];
            let consecutiveWhiffs = 0; // Pity

            for (let b = 0; b < amount; b++) {
                const boosterPack: Card[] = [];

                // (God/Gold Pack)
                const packRoll = Math.random();
                const isGodPack = packRoll < 0.0015;  // ~0.15% (1 em ~650)
                const isGoldPack = packRoll >= 0.0015 && packRoll < 0.0020; // ~0.05% (1 em 2000)

                // GOLD PACK
                if (isGoldPack) {
                    for (let i = 0; i < 10; i++) {
                        boosterPack.push(getRandomCard(poolGold));
                    }
                    openedBoosters.push(boosterPack);
                    consecutiveWhiffs = 0;
                    continue;
                }

                // GOD PACK
                if (isGodPack) {
                    const ilustracoes = listCards.filter(c =>
                        c.rarity?.includes('ilustração') || c.rarity?.includes('illustration')
                    );
                    const poolGodPack = ilustracoes.length > 0 ? ilustracoes : poolHits;

                    for (let i = 0; i < 10; i++) {
                        if (i === 9) {
                            boosterPack.push(getRandomCard(poolGold));
                        } else {
                            boosterPack.push(getRandomCard(poolGodPack));
                        }
                    }
                    openedBoosters.push(boosterPack);
                    consecutiveWhiffs = 0;
                    continue;
                }

                // Slots 1 a 4: Comuns
                for (let i = 0; i < 4; i++) {
                    boosterPack.push(getRandomCard(comuns.length > 0 ? comuns : listCards));
                }

                // Slots 5 a 7: Incomuns
                for (let i = 0; i < 3; i++) {
                    boosterPack.push(getRandomCard(incomuns.length > 0 ? incomuns : listCards));
                }

                // Slots 8 e 9: Vagas Paralelas (Reverse Holo / Foil)
                boosterPack.push(getRandomCard(poolReverse));
                boosterPack.push(getRandomCard(poolReverse));

                // Slot 10: Slot de Sorte do Hit com Pity acumulativo
                const baseHitChance = 0.333;
                const dynamicChance = baseHitChance + (consecutiveWhiffs * 0.15);
                const hitRoll = Math.random();

                if (hitRoll < dynamicChance) {
                    boosterPack.push(getRandomCard(poolHits));
                    consecutiveWhiffs = 0;
                } else {
                    boosterPack.push(getRandomCard(poolRara));
                    consecutiveWhiffs++;
                }

                openedBoosters.push(boosterPack);
            }

            return openedBoosters;

        } catch (err) {
            console.error("Erro ao abrir booster do Pokémon TCG:", err);
            throw new Error("Não foi possível carregar esse booster.");
        }
    }
}


export const pokemonTcg = new PokemonTCGService("pt");