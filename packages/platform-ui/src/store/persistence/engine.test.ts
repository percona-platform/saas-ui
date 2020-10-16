import { loadState, saveState } from 'store/persistence/engine';
import { STATE_LOCALSTORAGE_KEY } from 'core/constants';

const TEST_STATE = {
  auth: {
    pending: false, email: 'test@test.test', authenticated: false, authCheckCompleted: true,
  },
};
const TEST_ERROR = Error('test error');

let getItem: jest.SpyInstance;
let setItem: jest.SpyInstance;
let consoleError: jest.SpyInstance;

describe('Persistence Engine', () => {
  beforeEach(() => {
    getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify(TEST_STATE));
    setItem = jest.spyOn(Storage.prototype, 'setItem');
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('saveState succeeds', () => {
    saveState(TEST_STATE);

    expect(setItem).toBeCalledTimes(1);
    expect(setItem).toBeCalledWith(STATE_LOCALSTORAGE_KEY, JSON.stringify(TEST_STATE));
  });

  test('saveState fails', () => {
    setItem.mockImplementation(() => { throw TEST_ERROR; });

    saveState(TEST_STATE);

    expect(setItem).toBeCalledTimes(1);
    expect(setItem).toBeCalledWith(STATE_LOCALSTORAGE_KEY, JSON.stringify(TEST_STATE));
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError).toBeCalledWith(TEST_ERROR);
  });

  test('loadState returns the saved state', () => {
    const state = loadState();

    expect(getItem).toBeCalledTimes(1);
    expect(getItem).toBeCalledWith(STATE_LOCALSTORAGE_KEY);
    expect(state).toEqual(TEST_STATE);
  });

  test('loadState returns undefined on missing saved state', () => {
    getItem.mockImplementation(() => null);

    const state = loadState();

    expect(getItem).toBeCalledTimes(1);
    expect(getItem).toBeCalledWith(STATE_LOCALSTORAGE_KEY);
    expect(state).toBe(undefined);
  });

  test('loadState fails', () => {
    getItem.mockImplementation(() => { throw TEST_ERROR; });

    const state = loadState();

    expect(getItem).toBeCalledTimes(1);
    expect(getItem).toBeCalledWith(STATE_LOCALSTORAGE_KEY);
    expect(state).toBe(undefined);
    expect(consoleError).toBeCalledTimes(1);
    expect(consoleError).toBeCalledWith(TEST_ERROR);
  });
});
