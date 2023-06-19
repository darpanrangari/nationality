import { fetch } from '../../utils/service';
import {
  makeRequest,
  appConfigRequest,
  clearSessionRequest,
  getPostalAddressDetails
} from '../apl';

export const emptyPromise = new Promise(() => {});

jest.mock('../../utils/service', () => ({
  fetch: jest.fn()
}));

describe('API', () => {
  beforeEach(() => {
    global.window.location = { href: '' } as Location;
  });

  it('test makeRequest rejects correctly when responseText property is in error', () => {
    const xhrError = { responseText: '{"message":"error"}' };
    (fetch as jest.Mock).mockImplementation(() => Promise.reject(xhrError));

    const url = '/s';
    const data = 'test';
    const headers = { 'Cache-Control': 'no-cache, no-store' };

    return makeRequest('GET', url, data, headers).catch((e) => {
      expect(e.message).toEqual('error');
      (fetch as jest.Mock).mockReset();
    });
  });

  it('test makeRequest rejects correctly when no responseText property is in error', () => {
    const xhrError = new Error();
    (fetch as jest.Mock).mockImplementation(() => Promise.reject(xhrError));

    const url = '/s';
    const data = 'test';
    const headers = { 'Cache-Control': 'no-cache, no-store' };

    return makeRequest('GET', url, data, headers).catch(() => {
      (fetch as jest.Mock).mockReset();
    });
  });

  it('tests appConfigRequest', () => {
    const response = appConfigRequest();
    expect(response).toEqual(emptyPromise);
  });

  it('tests clearSessionRequest', () => {
    const response = clearSessionRequest();
    expect(response).toEqual(emptyPromise);
  });

  it('tests getPostalAddressDetails', () => {
    const response = getPostalAddressDetails();
    expect(response).toEqual(emptyPromise);
  });
});
