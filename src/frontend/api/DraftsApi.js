import { get, post, put, delete_ } from "./Api.js";

const baseUrl = "/api/drafts";

export async function getDrafts() {
    return await get(baseUrl);
}

export async function getDraft(draftId) {
    return await get(baseUrl + `/${draftId}`);
}

export async function getBooster(draftId) {
    return await get(baseUrl + `/${draftId}/booster`);
}

export async function getPicks(draftId) {
    return await get(baseUrl + `/${draftId}/picks`);
}

export async function joinDraft(draftId) {
    return await put(baseUrl + `/${draftId}/join`);
}

export async function createDraft() {
    return await post(baseUrl, null, true);
}

export async function startDraft(draftId) {
    return await post(baseUrl + `/${draftId}/start`);
}

export async function submitPick(draftId, pickNumber, cardId) {
    return await post(baseUrl + `/${draftId}/pick`, { pickNumber: pickNumber, cardId: cardId });
}

export async function deleteDraft(draftId) {
    return await delete_(baseUrl + `/${draftId}`);
}

export async function leaveDraft(draftId) {
    return await put(baseUrl + `/${draftId}/leave`);
}
