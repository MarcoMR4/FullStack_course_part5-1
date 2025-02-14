const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'new note' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(content).waitFor()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('label:text("Title:") + input').fill(title)
    await page.locator('label:text("Author:") + input').fill(author)
    await page.locator('label:text("Url:") + input').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
    // await page.getByText(title).waitFor()
}

  
export { loginWith, createNote, createBlog }