import {expect} from "playwright-test-coverage";
import {Role} from "../src/service/pizzaService.js";

export const validUsers = {
  'd@jwt.com': { id: '3', name: 'Kai Chen', email: 'd@jwt.com', password: 'a', roles: [{ role: Role.Diner }] },
  'a@jwt.com': { id: '3', name: 'Kai Chen', email: 'a@jwt.com', password: 'a', roles: [{ role: Role.Admin }] }
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

export async function mockFranchises(page) {
  // Standard franchises and stores
  await page.route(/\/api\/franchise(\?.*)+$/, async (route) => {
    const franchiseRes = {
      franchises: [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ],
      more: true
    };
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });
}

export async function mockDeleteFranchise(page) {
  await page.route(/\/api\/franchise\/\d+$/, async (route) => {
    const deleteFranchiseRes = {
      message: 'franchise deleted'
    };
    expect(route.request().method()).toBe('DELETE');
    await route.fulfill({ json: deleteFranchiseRes });
  });
}

export async function mockAddFranchise(page) {
  await page.route('*/**/api/franchise', async (route) => {
    const franchise = route.request().postDataJSON();
    const admin = validUsers['a@jwt.com']
    const addFranchiseRes = {
      stores: [],
      id: 5,
      name: franchise.name,
      admins: [
        {
          name: admin.name,
          id: admin.id,
          email: admin.email
        }
      ]
    }
    expect(route.request().method()).toBe('POST');
    await route.fulfill({ json: addFranchiseRes });
  });
}