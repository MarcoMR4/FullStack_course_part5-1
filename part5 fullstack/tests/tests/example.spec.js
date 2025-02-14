const { test, describe, expect, beforeEach } = require('@playwright/test')
import { loginWith, createNote, createBlog } from './helper'

describe('Note app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'superuser',
        username: 'root',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'root', 'salainen')
    await expect(page.getByText('Superuser logged in')).toBeVisible()
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('root')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('superuser logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', true)
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note by playwright', true)
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })


    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('Logout')).toBeVisible()
      await createBlog(page, 'Blog 1', 'Tester', 'www.example.com')
      await expect(page.getByText('Blog 1 by Tester added successfully! ')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
      })
  
      test('one of those can be made nonimportant', async ({ page }) => {
        const otherNoteElement = await page.getByText('first note')
  
        await otherNoteElement
          .getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })  

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('root')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('wrong credentials')).toBeVisible()
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')

    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  describe('A blog can be liked and deleted', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('Logout')).toBeVisible()
      await createBlog(page, 'Blog 2', 'Tester', 'www.example.com')
      await expect(page.getByText('Blog 2 by Tester added successfully! ')).toBeVisible()

      await page.locator('#showBlog').click();
      await page.getByRole('button', { name: 'loik' }).click()
      await expect(page.getByText('Like added!')).toBeVisible()

      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm'); 
        await dialog.accept();
      });
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText('Blog deleted successfully!')).toBeVisible()
    })
  })

  test('If not logged, you can not even see blogs', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('root')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('to application')).toBeVisible()
  })


})


























// // @ts-check
// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
