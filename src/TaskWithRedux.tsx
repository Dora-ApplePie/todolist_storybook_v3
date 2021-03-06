import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const TaskWithRedux = React.memo(({
                                    taskId,
                                    todolistId
                                }: TaskPropsType) => {

        console.log('Task')

        const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
            .filter(task => task.id === taskId)[0])

        const dispatch = useDispatch();

        const onClickHandler = useCallback(() => dispatch(removeTaskAC(taskId, todolistId)), [taskId, todolistId]);

        const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId));
        }, [taskId, todolistId]);

        const onTitleChangeHandler = useCallback((newValue: string) => {
            dispatch(changeTaskTitleAC(taskId, newValue, todolistId));
        }, [taskId, todolistId]);


        return <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    }
)
