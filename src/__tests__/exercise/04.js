// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const USERNAME_TEXT = 'test@test.com'
  const PASSWORD_TEXT = 'password'
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  userEvent.type(username, USERNAME_TEXT)
  userEvent.type(password, PASSWORD_TEXT)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)
  expect(handleSubmit).toHaveBeenCalledWith({
    username: USERNAME_TEXT,
    password: PASSWORD_TEXT,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
