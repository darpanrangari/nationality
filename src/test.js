import { fetch } from '../utils/service';
import { SAVINGS_SERVICES } from '../paths';
import {
  ErrorResponse,
  InitiateResponse,
  PostalAddress,
  Request,
} from './types/api.types';
import {
  makeRequest,
  updateVersionUrl,
  appConfigRequest,
  getPostalAddressDetails,
  clearSessionRequest,
} from './your-module';

jest.mock('../utils/service', () => ({
  fetch: jest.fn(),
}));

describe('Your Module', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a request correctly', async () => {
    const mockResponse = { success: true };
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    fetch.mockImplementation(mockFetch);

    const method = 'GET';
    const url = '/api/endpoint';
    const data = { key: 'value' };
    const headers = { 'Content-Type': 'application/json' };

    const response = await makeRequest<InitiateResponse | ErrorResponse>({
      method,
      url,
      data,
      headers,
    });

    expect(mockFetch).toHaveBeenCalledWith(method, {
      url,
      contentType: 'application/json',
      data,
      headers,
    });
    expect(response).toEqual(mockResponse);
  });

  it('should update the version in the URL correctly', () => {
    const url = '/api/{version}/endpoint';
    const version = 'v1';
    const updatedUrl = updateVersionUrl(url, version);
    expect(updatedUrl).toBe('/api/v1/endpoint');
  });

  it('should make an appConfig request correctly', async () => {
    const mockResponse = { config: {} };
    const mockMakeRequest = jest
      .fn()
      .mockResolvedValue(mockResponse);
    makeRequest.mockImplementation(mockMakeRequest);

    const response = await appConfigRequest();

    expect(mockMakeRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: paths.initiateUrl,
    });
    expect(response).toEqual(mockResponse);
  });

  it('should get postal address details correctly', async () => {
    const mockResponse = [{ address: '123 Street' }];
    const mockMakeRequest = jest
      .fn()
      .mockResolvedValue(mockResponse);
    makeRequest.mockImplementation(mockMakeRequest);

    const apiVersions = {
      [SAVINGS_SERVICES]: 'v1',
      'POSTAL ADDRESS SERVICE': 'v2',
    };
    const postcode = '12345';

    const response = await getPostalAddressDetails(apiVersions, postcode);

    expect(mockMakeRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: updateVersionUrl(
        paths.postalAddress,
        apiVersions[SAVINGS_SERVICES].replace('(postcode)', postcode)
      ),
    });
    expect(response).toEqual(mockResponse);
  });

  it('should make a clear session request correctly', async () => {
    const mockResponse = { success: true };
    const mockMakeRequest = jest
      .fn()
      .mockResolvedValue(mockResponse);
    makeRequest.mockImplementation(mockMakeRequest);

    const response = await clearSessionRequest();

    expect(mockMakeRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: paths.initiateUri,
    });
    expect(response).toEqual(mockResponse);
  });
});
