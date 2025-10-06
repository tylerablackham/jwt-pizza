import {expect} from "playwright-test-coverage";
import {Role} from "../src/service/pizzaService.js";

export const validUsers = {
  'd@jwt.com': { id: '3', name: 'Kai Chen', email: 'd@jwt.com', password: 'a', roles: [{ role: Role.Diner }] }
};

export function getInitials(name) {
  return name.split(' ').filter(Boolean).map(word => word[0]).join('');
}

export async function mockLogin(page) {
  let loggedInUser
  // Authorize login for the given user
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = route.request().postDataJSON();
    const user = validUsers[loginReq.email];
    if (!user || user.password !== loginReq.password) {
      await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
      return;
    }
    loggedInUser = validUsers[loginReq.email];
    const loginRes = {
      user: loggedInUser,
      token: 'abcdef',
    };
    expect(route.request().method()).toBe('PUT');
    await route.fulfill({ json: loginRes });
  });

  // Return the currently logged in user
  await page.route('*/**/api/user/me', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: loggedInUser });
  });
}

export async function mockRegister(page) {
  let registeredUser
  // Authorize register for the given user
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = route.request().postDataJSON();
    const user = validUsers[registerReq.email];
    if (!user || user.password !== registerReq.password) {
      await route.fulfill({ status: 401, json: { error: 'Unauthorized' } });
      return;
    }
    registeredUser = validUsers[registerReq.email];
    const registerRes = {
      user: registeredUser,
      token: 'abcdef',
    };
    expect(route.request().method()).toBe('POST');
    await route.fulfill({ json: registerRes });
  });

  // Return the currently logged in user
  await page.route('*/**/api/user/me', async (route) => {
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: registeredUser });
  });
}

export async function mockLogout(page) {
  // Authorize logout for the given user
  await page.route('*/**/api/auth', async (route) => {
    const logoutRes = {
      message: 'logout successful'
    };
    expect(route.request().method()).toBe('DELETE');
    await route.fulfill({ json: logoutRes });
  });
}