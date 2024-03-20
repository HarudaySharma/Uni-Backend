export let currentUserId: number = 1;

export const changeCurrenUserId = (id: number): Boolean => {
    currentUserId = id;
    return true;
}
