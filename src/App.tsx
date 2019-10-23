import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import './App.css'
import { isTSModuleBlock } from '@babel/types'
type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

interface LIProps extends ITodo {
  readonly striked?: boolean
}

const StyledLI = styled.li<LIProps>`
  text-decoration: ${props => (props.striked ? 'line-through' : 'none')};
`
const StyledFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  justify-items: center;
`

function App(props: any): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <>
      <StyledWrapper>
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          />
          <button type='submit'>Add todo</button>
          <section>
            <ul>
              {todos.map((todo: ITodo, index: number) => (
                <StyledFlexRow>
                  <StyledLI
                    key={index}
                    {...props}
                    striked={todo.complete}
                    onClick={() => completeTodo(index)}
                  >
                    {todo.text}
                  </StyledLI>
                  <button type='button' onClick={() => deleteTodo(index)}>
                    &times;
                  </button>
                </StyledFlexRow>
              ))}
            </ul>
          </section>
        </form>
        <p style={{ fontStyle: 'italic' }}>
          ***Functionality: can add and delete todos, click on todos to mark as
          completed with line-through prop called striked
        </p>
      </StyledWrapper>
    </>
  )
}

export default App
