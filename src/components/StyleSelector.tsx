import React from 'react';

export interface ArchitecturalStyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface StyleSelectorProps {
  styles: ArchitecturalStyle[];
  selectedStyle?: string;
  onStyleSelect: (styleId: string) => void;
}

const ARCHITECTURAL_STYLES: ArchitecturalStyle[] = [
  {
    id: 'mughal',
    name: 'Mughal Architecture',
    description: 'Characterized by domes, arches, and intricate geometric patterns',
    imageUrl: '/styles/mughal.jpg'
  },
  {
    id: 'dravidian',
    name: 'Dravidian Architecture',
    description: 'Known for pyramidal towers, elaborate sculptures, and stone carvings',
    imageUrl: '/styles/dravidian.jpg'
  },
  {
    id: 'rajput',
    name: 'Rajput Architecture',
    description: 'Features massive forts, ornate palaces, and detailed jharokhas',
    imageUrl: '/styles/rajput.jpg'
  },
  {
    id: 'bengal',
    name: 'Bengal Architecture',
    description: 'Distinctive curved roofs, terracotta temples, and Islamic influences',
    imageUrl: '/styles/bengal.jpg'
  },
  {
    id: 'kerala',
    name: 'Kerala Architecture',
    description: 'Sloping roofs, courtyard-centered layouts, and wooden craftsmanship',
    imageUrl: '/styles/kerala.jpg'
  }
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles = ARCHITECTURAL_STYLES,
  selectedStyle,
  onStyleSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {styles.map((style) => (
        <div
          key={style.id}
          className={`
            relative rounded-lg overflow-hidden cursor-pointer transition-all
            ${selectedStyle === style.id ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'}
          `}
          onClick={() => onStyleSelect(style.id)}
        >
          <img
            src={style.imageUrl}
            alt={style.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-lg font-semibold">{style.name}</h3>
            <p className="text-sm text-gray-200">{style.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}; 