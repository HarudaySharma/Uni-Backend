//title and id and status
export type STATUS = 'DONE' | 'PENDING';

export type TASK = {
    title: string,
    id: number,
    status: STATUS,
};
