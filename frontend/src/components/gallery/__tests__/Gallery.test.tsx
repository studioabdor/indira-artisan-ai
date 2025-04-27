const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { I18nextProvider } = require('react-i18next');
const i18n = require('../../../i18n/config');
const Gallery = require('../Gallery').default;

const mockDesigns = [
  {
    id: '1',
    imageUrl: 'https://example.com/image1.jpg',
    prompt: 'Modern house design',
    style: 'Contemporary',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    imageUrl: 'https://example.com/image2.jpg',
    prompt: 'Traditional temple architecture',
    style: 'Temple',
    createdAt: '2024-03-15T11:00:00Z',
  },
];

const mockOnDownload = jest.fn();
const mockOnShare = jest.fn();

const renderGallery = (props = {}) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <Gallery
        designs={mockDesigns}
        isLoading={false}
        onDownload={mockOnDownload}
        onShare={mockOnShare}
        {...props}
      />
    </I18nextProvider>
  );
};

describe('Gallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    renderGallery({ isLoading: true });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = 'Failed to load designs';
    renderGallery({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByText('common.tryAgain')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    renderGallery({ designs: [] });
    expect(screen.getByText('gallery.noDesigns')).toBeInTheDocument();
  });

  it('renders designs grid', () => {
    renderGallery();
    mockDesigns.forEach((design) => {
      expect(screen.getByAltText(design.prompt)).toBeInTheDocument();
      expect(screen.getByText(design.prompt)).toBeInTheDocument();
    });
  });

  it('calls onDownload when download button is clicked', () => {
    renderGallery();
    const downloadButtons = screen.getAllByTitle('gallery.download');
    fireEvent.click(downloadButtons[0]);
    expect(mockOnDownload).toHaveBeenCalledWith(mockDesigns[0]);
  });

  it('calls onShare when share button is clicked', () => {
    renderGallery();
    const shareButtons = screen.getAllByTitle('gallery.share');
    fireEvent.click(shareButtons[0]);
    expect(mockOnShare).toHaveBeenCalledWith(mockDesigns[0]);
  });
}); 