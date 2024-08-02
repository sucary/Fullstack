import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'putin',
        likes: 3,
        url: 'https://fullstackopen.com/en/part5/testing_react_apps#test-file-location'
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent('putin')
    expect(div).not.toHaveTextContent('https://fullstackopen.com/en/part5/testing_react_apps#test-file-location')
    expect(div).not.toHaveTextContent('likes 3')
})