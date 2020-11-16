import React, { useEffect, useState } from 'react'

import './Tasks.css'
import api from '../../api'

const Tasks = () => {
    const [description, setDescription] = useState('')
    const [tasks, setTasks] = useState([])
    const [messageError, setMessageError] = useState('')
    const [messageListError, setMessageListError] = useState('')

    useEffect(() => {
        queryTasks()
    }, [])

    const hadleSubmit = async (event) => {
        try {
            event.preventDefault()
            const body = {
                description
            }
            await api.post('/task', body)
            setDescription('')
            queryTasks()
        } catch (error) {
            const { message } = error.response.data
            setMessageError(message)
            setTimeout(() => {
                setMessageError('')
            }, 5000)
        }
    }

    const queryTasks = async () => {
        try {
            const response  = await api.get('/task')
            setTasks(response.data)
        } catch (error) {
            const { message } = error.response.data
            setMessageListError(message)
            setTimeout(() => {
                setMessageListError('')
            }, 5000)
        }
    }

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}`)
            queryTasks()
        } catch (error) {
            const { message } = error.response.data
            setMessageListError(message)
            setTimeout(() => {
                setMessageListError('')
            }, 5000)
        }
    }

    return (
        <div>
            <div className="taskFormContainer">
                <form className="taskForm" onSubmit={hadleSubmit}>
                    <span className="titleTaskForm">Adicionar Tarefa</span>
                    <input className="inputTaskForm" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
                    <button className="buttonTaskForm" type="submit">Salvar</button>
                    {messageError && <span className="messageErrorTaskForm">{messageError}</span>}
                </form>
            </div>
            <div className="taskListContainer">
                <h2>Lista de Tarefas</h2>
                <ul className="taskList">
                    {
                        tasks.map(task => (
                            <li key={task._id}>{task.description} <button onClick={() => deleteTask(task._id)}>Deletar</button></li>
                        ))
                    }
                    {messageListError && <span>{messageListError}</span>}
                </ul>
            </div>
        </div>
    )
}

export default Tasks