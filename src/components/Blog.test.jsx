import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    const user = userEvent.setup()
        
    const mockHandleLike = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog 
                title="test blog 1" 
                author="tester" 
                url="example.com" 
                likes={2} 
                handleLikeBlog={mockHandleLike} 
            />
        ).container
    })

    test('Blog title showed first...', async () => {
        await screen.findAllByText("test blog 1")
    })

    test('renders a button to show details', () => {
        const button = screen.getByRole('button', { name: /view/i })
        expect(button).toBeInTheDocument()
    })

    test('clicking the show details like author', async () => {
        const button = screen.getByRole('button', { name: /view/i })
        await user.click(button) 
        expect(screen.getByText('tester')).toBeInTheDocument()
    })

    test('clicking the show details like url', async () => {
        const button = screen.getByRole('button', { name: /view/i })
        await user.click(button) 
        expect(screen.getByText('example.com')).toBeInTheDocument()
        expect(screen.getByText(/likes:\s*2/i)).toBeInTheDocument()
    })

    test('clicking twice like button', async () => {
        const button1 = screen.getByRole('button', { name: /view/i })
        await user.click(button1) 
        expect(screen.getByText(/likes:\s*2/i)).toBeInTheDocument()
        const button2 = screen.getByRole('button', { name: /loik/i })
        await user.click(button2) 
        await user.click(button2)
        expect(mockHandleLike).toHaveBeenCalledTimes(2) 
    })
    
    

})