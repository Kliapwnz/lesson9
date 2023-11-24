import {TasksStateType} from '../App';

export type removeTaskActionType = ReturnType<typeof removeTaskAC>


export type SecondActionType = {
    type: '',
}

type ActionsType = removeTaskActionType | SecondActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        }
        case '':
            return state

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    } as const
}
export const SecondAC = (title: string): SecondActionType => {
    return {type: ''}
}

