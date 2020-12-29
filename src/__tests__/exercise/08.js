// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function setup(initialState) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(initialState)
    return null
  }
  render(<TestComponent />)
  return result
}

function Counter() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <h1>Current count: {count}</h1>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)
  const message = screen.getByText(/current count/i)
  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(screen.getByRole('button', {name: /increment/i}))
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(message).toHaveTextContent('Current count: 0')
})

test('exposes the count and increment/decrement functions using a fake component', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialCount: 4})
  expect(result.current.count).toBe(4)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(4)
})

test('allows customization of the step', () => {
  const result = setup({step: 5})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
