/// <reference types="jest" />

const DesignService = require('../designs').default;
const api = require('../api');

jest.mock('../api');

describe('DesignService', () => {
  const mockDesign = {
    id: '1',
    imageUrl: 'https://example.com/image.jpg',
    prompt: 'Test design',
    style: 'Contemporary',
    createdAt: '2024-03-15T10:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDesigns', () => {
    it('fetches designs successfully', async () => {
      const mockResponse = { data: [mockDesign] };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await DesignService.getDesigns();
      expect(result).toEqual([mockDesign]);
      expect(api.get).toHaveBeenCalledWith('/designs');
    });

    it('handles api error', async () => {
      const error = new Error('API Error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(DesignService.getDesigns()).rejects.toThrow('API Error');
    });
  });

  describe('generateDesign', () => {
    const generateData = {
      prompt: 'Test prompt',
      style: 'Contemporary',
    };

    it('generates design successfully', async () => {
      const mockResponse = { data: mockDesign };
      (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await DesignService.generateDesign(generateData);
      expect(result).toEqual(mockDesign);
      expect(api.post).toHaveBeenCalledWith('/designs/generate', generateData);
    });
  });

  describe('downloadDesign', () => {
    it('downloads design successfully', async () => {
      const mockBlob = new Blob(['test'], { type: 'image/jpeg' });
      const mockResponse = { data: mockBlob };
      (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await DesignService.downloadDesign('1');
      expect(result).toEqual(mockBlob);
      expect(api.get).toHaveBeenCalledWith('/designs/1/download', {
        responseType: 'blob',
      });
    });
  });

  describe('shareDesign', () => {
    it('shares design successfully', async () => {
      const mockShareUrl = 'abc123';
      const mockResponse = { data: { shareUrl: mockShareUrl } };
      (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await DesignService.shareDesign('1');
      expect(result).toEqual({ shareUrl: mockShareUrl });
      expect(api.post).toHaveBeenCalledWith('/designs/1/share');
    });
  });

  describe('getShareableLink', () => {
    it('returns correct shareable link', () => {
      const shareUrl = 'abc123';
      const expectedUrl = `${window.location.origin}/shared/${shareUrl}`;
      const result = DesignService.getShareableLink(shareUrl);
      expect(result).toBe(expectedUrl);
    });
  });

  describe('downloadFile', () => {
    let createObjectURLSpy;
    let revokeObjectURLSpy;

    beforeEach(() => {
      createObjectURLSpy = jest.spyOn(URL, 'createObjectURL');
      revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL');
      document.body.innerHTML = '';
    });

    afterEach(() => {
      createObjectURLSpy.mockRestore();
      revokeObjectURLSpy.mockRestore();
    });

    it('creates and clicks download link', () => {
      const mockBlob = new Blob(['test'], { type: 'image/jpeg' });
      const mockUrl = 'blob:test';
      createObjectURLSpy.mockReturnValue(mockUrl);

      DesignService.downloadFile(mockBlob, 'test.jpg');

      expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
      expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockUrl);
    });
  });
}); 