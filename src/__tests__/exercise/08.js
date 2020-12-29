// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
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

/* eslint no-unused-vars:0 */
