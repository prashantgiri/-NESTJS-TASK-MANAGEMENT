/* eslint-disable prettier/prettier */
export type Task = {
    id:string;
    name:string;
    description:string;
    status:TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    DONE= 'DONE'
}