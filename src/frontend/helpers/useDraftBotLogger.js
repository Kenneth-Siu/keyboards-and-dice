import { useEffect } from "react";
import { flattenDeep } from "lodash";
import { Bot } from "../../backend/helpers/bot/Bot";

export function useDraftBotLogger(boosterLoading, picksLoaded, boosterCards, picks) {
    useEffect(() => {
        if (!boosterLoading && picksLoaded && boosterCards) {
            const picksAsList = [
                ...flattenDeep(picks.deckCreatures),
                ...flattenDeep(picks.deckNonCreatures),
                ...flattenDeep(picks.sideboardCreatures),
                ...flattenDeep(picks.sideboardNonCreatures),
            ];
            new Bot(flattenDeep(picksAsList), true).decidePick(boosterCards);
        }
    }, [boosterLoading, picksLoaded]);
}
