import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText(/title:/i)
  const authorInput = screen.getByLabelText(/author:/i)
  const urlInput = screen.getByLabelText(/url:/i)
  
  const sendButton = screen.getByText('save') 

  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
//   expect(createBlog.mock.calls[0][0]).toEqual({
//     title: 'Test Blog',
//     author: 'Test Author',
//     url: 'https://example.com',
//     content: 'testing a form...'
//   })
})