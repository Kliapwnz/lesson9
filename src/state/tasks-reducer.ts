import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type chaneTitleActionType = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType = removeTaskActionType
    | addTaskActionType
    | changeTaskActionType
    | chaneTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }

        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)
            }
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []

            }
        }
        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.id]
            // return copyState
            const {[action.id]:[], ...rest}=state
            return rest
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-STATUS", taskId, isDone, todolistId} as const
}

export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE", taskId, title, todolistId} as const
}