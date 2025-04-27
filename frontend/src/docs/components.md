# Components Documentation

## Gallery Component

The Gallery component displays a grid of generated architectural designs with download and sharing capabilities.

### Props

- `designs`: Array of Design objects
- `isLoading`: Boolean indicating loading state
- `error`: Optional error message string
- `onDownload`: Callback function when download button is clicked
- `onShare`: Callback function when share button is clicked

### Usage

```tsx
import Gallery from '../components/gallery/Gallery';
import { Design } from '../types';

function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleDownload = async (design: Design) => {
    try {
      const blob = await DesignService.downloadDesign(design.id);
      DesignService.downloadFile(blob, `design-${design.id}.jpg`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (design: Design) => {
    try {
      const { shareUrl } = await DesignService.shareDesign(design.id);
      const link = DesignService.getShareableLink(shareUrl);
      await navigator.clipboard.writeText(link);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <Gallery
      designs={designs}
      isLoading={isLoading}
      error={error}
      onDownload={handleDownload}
      onShare={handleShare}
    />
  );
}
```

### Features

1. Responsive grid layout
2. Loading state with spinner
3. Error state with retry option
4. Empty state message
5. Download functionality
6. Share functionality
7. Hover effects for actions
8. Image optimization
9. Accessibility support
10. Internationalization support

### Styling

The component uses Tailwind CSS for styling and includes:
- Responsive grid layout
- Hover effects
- Loading animations
- Image aspect ratio handling
- Accessibility-friendly contrast ratios

## Design Service

The DesignService handles all design-related API operations.

### Methods

#### `getDesigns()`
Fetches all designs from the API.

#### `generateDesign(data: GenerateDesignRequest)`
Generates a new design based on prompt and style.

#### `downloadDesign(designId: string)`
Downloads a specific design as a blob.

#### `shareDesign(designId: string)`
Creates a shareable link for a design.

#### `getShareableLink(shareUrl: string)`
Constructs the full shareable URL.

#### `downloadFile(blob: Blob, filename: string)`
Handles the browser file download process.

### Error Handling

The service includes comprehensive error handling for:
- Network errors
- API errors
- File download issues
- Share functionality failures

### Testing

Components and services are tested using:
- Jest for unit testing
- React Testing Library for component testing
- Mock service workers for API testing
- Snapshot testing for UI consistency

### Best Practices

1. Use TypeScript for type safety
2. Implement proper error handling
3. Follow accessibility guidelines
4. Support internationalization
5. Maintain responsive design
6. Optimize performance
7. Write comprehensive tests
8. Document code and components 