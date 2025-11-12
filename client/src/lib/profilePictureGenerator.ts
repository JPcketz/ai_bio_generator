import type { BioStyle, Platform } from './bioGenerator';

export interface ProfilePictureConfig {
  url: string;
  style: string;
  seed: string;
}

// DiceBear avatar styles that match our bio styles
const styleToAvatarStyle: Record<BioStyle, string[]> = {
  professional: ['avataaars', 'notionists', 'lorelei'],
  creative: ['bottts', 'pixel-art', 'fun-emoji'],
  funny: ['big-smile', 'croodles', 'thumbs'],
  inspirational: ['adventurer', 'notionists', 'lorelei'],
  minimalist: ['initials', 'shapes', 'rings']
};

// Color schemes that match our purple-turquoise theme
const colorSchemes: Record<BioStyle, { backgroundColor: string; colors?: string[] }> = {
  professional: {
    backgroundColor: '1e293b',
    colors: ['8b5cf6', '06b6d4', '6366f1']
  },
  creative: {
    backgroundColor: 'f59e0b',
    colors: ['ec4899', '8b5cf6', '06b6d4', 'f59e0b']
  },
  funny: {
    backgroundColor: 'fbbf24',
    colors: ['f59e0b', 'ec4899', '06b6d4']
  },
  inspirational: {
    backgroundColor: 'a78bfa',
    colors: ['8b5cf6', '06b6d4', 'a78bfa']
  },
  minimalist: {
    backgroundColor: 'e5e7eb',
    colors: ['6b7280', '9ca3af']
  }
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSeed(bio: string, index: number): string {
  // Create a unique seed based on bio content and index
  const bioHash = bio.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `${bioHash}-${index}-${Date.now()}`;
}

export function generateProfilePictureUrl(
  style: BioStyle,
  platform: Platform,
  seed: string,
  size: number = 400
): ProfilePictureConfig {
  const avatarStyles = styleToAvatarStyle[style];
  const selectedAvatarStyle = getRandomItem(avatarStyles);
  const colorScheme = colorSchemes[style];
  
  // Build DiceBear API URL
  let url = `https://api.dicebear.com/7.x/${selectedAvatarStyle}/svg?seed=${encodeURIComponent(seed)}&size=${size}`;
  
  // Add background color
  url += `&backgroundColor=${colorScheme.backgroundColor}`;
  
  // Add color scheme if available
  if (colorScheme.colors && colorScheme.colors.length > 0) {
    // Some styles support specific color parameters
    if (['avataaars', 'notionists', 'lorelei', 'adventurer'].includes(selectedAvatarStyle)) {
      // These styles have good color support
      url += `&backgroundType=solid`;
    }
  }
  
  // Platform-specific adjustments
  if (platform === 'linkedin') {
    url += `&radius=50`; // More professional, rounded
  } else if (platform === 'instagram' || platform === 'tiktok') {
    url += `&radius=50`; // Fully rounded for social media
  }
  
  return {
    url,
    style: selectedAvatarStyle,
    seed
  };
}

export function generateMultipleProfilePictures(
  style: BioStyle,
  platform: Platform,
  bio: string,
  count: number = 3
): ProfilePictureConfig[] {
  const pictures: ProfilePictureConfig[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = generateSeed(bio, i);
    pictures.push(generateProfilePictureUrl(style, platform, seed));
  }
  
  return pictures;
}

export const styleDescriptions: Record<BioStyle, string> = {
  professional: 'Corporate-style avatar with professional aesthetic',
  creative: 'Artistic and colorful avatar design',
  funny: 'Playful and fun avatar style',
  inspirational: 'Uplifting and positive avatar design',
  minimalist: 'Clean and simple avatar composition'
};

// Helper function to download profile picture
export async function downloadProfilePicture(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading profile picture:', error);
    throw error;
  }
}
