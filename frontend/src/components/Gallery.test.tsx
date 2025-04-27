import { render, screen } from '@testing-library/react';
import Gallery from './gallery/Gallery';
import i18n from '../i18n/config';

jest.mock('../i18n/config');

describe('Gallery', () => {
  it('renders gallery items', () => {
    const mockDesigns = [
      {
        id: '1',
        imageUrl: 'test.jpg',
        prompt: 'Test prompt',
        style: 'modern',
        createdAt: '2024-03-20'
      }
    ];

    render(
      <Gallery 
        designs={mockDesigns}
        isLoading={false}
        onDownload={() => {}}
        onShare={() => {}}
      />
    );
    // Add your test assertions here
  });
}); 