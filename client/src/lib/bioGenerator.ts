export type BioStyle = 'professional' | 'creative' | 'funny' | 'inspirational' | 'minimalist';
export type Platform = 'instagram' | 'twitter' | 'tiktok' | 'linkedin';

interface BioTemplate {
  prefix: string[];
  middle: string[];
  suffix: string[];
  emojis: string[];
}

const bioTemplates: Record<BioStyle, BioTemplate> = {
  professional: {
    prefix: [
      'Strategic thinker',
      'Results-driven professional',
      'Innovative leader',
      'Experienced specialist',
      'Dedicated expert',
      'Passionate professional',
      'Goal-oriented achiever',
      'Industry veteran'
    ],
    middle: [
      'helping businesses grow',
      'driving digital transformation',
      'building exceptional teams',
      'creating impactful solutions',
      'optimizing performance',
      'delivering measurable results',
      'fostering innovation',
      'leading with purpose'
    ],
    suffix: [
      'Let\'s connect and collaborate',
      'Always learning, always growing',
      'Making an impact, one project at a time',
      'Open to new opportunities',
      'Building the future together',
      'Committed to excellence',
      'Sharing insights and expertise',
      'Driven by purpose and passion'
    ],
    emojis: ['💼', '🎯', '📈', '🚀', '💡', '🏆', '⚡', '🌟']
  },
  creative: {
    prefix: [
      'Visual storyteller',
      'Creative soul',
      'Design enthusiast',
      'Artistic mind',
      'Digital creator',
      'Imagination architect',
      'Color & chaos curator',
      'Pixel perfectionist'
    ],
    middle: [
      'crafting visual experiences',
      'turning ideas into art',
      'designing with purpose',
      'creating magic with pixels',
      'bringing visions to life',
      'exploring creative boundaries',
      'making the ordinary extraordinary',
      'painting digital dreams'
    ],
    suffix: [
      'Let\'s create something amazing',
      'Always experimenting, never settling',
      'Art is my language',
      'Inspired by everything',
      'Creating beauty in chaos',
      'Follow for creative inspiration',
      'Turning coffee into creativity',
      'Making the world more beautiful'
    ],
    emojis: ['🎨', '✨', '🌈', '🎭', '🖌️', '💫', '🦄', '🌸']
  },
  funny: {
    prefix: [
      'Professional overthinker',
      'Certified snack enthusiast',
      'Part-time adult',
      'Professional procrastinator',
      'Chaos coordinator',
      'Sarcasm specialist',
      'Chief meme officer',
      'Professional napper'
    ],
    middle: [
      'pretending to have it all together',
      'surviving on coffee and chaos',
      'making questionable life choices',
      'turning anxiety into comedy',
      'living my best mediocre life',
      'adulting reluctantly',
      'winging it since [birth year]',
      'keeping it real (and ridiculous)'
    ],
    suffix: [
      'Send help (and snacks)',
      'Warning: may contain sarcasm',
      'Life is short, laugh more',
      'Taking life one meme at a time',
      'Professional mess, amateur adult',
      'Here for a good time, not a long time',
      'Chaos is my comfort zone',
      'Living proof that humor heals'
    ],
    emojis: ['😂', '🤪', '😎', '🍕', '☕', '🎉', '🤷', '🙃']
  },
  inspirational: {
    prefix: [
      'Dream chaser',
      'Believer in possibilities',
      'Light seeker',
      'Growth mindset advocate',
      'Purpose-driven soul',
      'Positive energy spreader',
      'Mindful wanderer',
      'Hope dealer'
    ],
    middle: [
      'inspiring others to shine',
      'turning dreams into reality',
      'spreading positivity daily',
      'embracing the journey',
      'choosing growth over comfort',
      'manifesting greatness',
      'living with intention',
      'creating ripples of change'
    ],
    suffix: [
      'Your vibe attracts your tribe',
      'Believe in your magic',
      'The best is yet to come',
      'Rise above and shine',
      'Be the energy you want to attract',
      'Small steps, big dreams',
      'Your story matters',
      'Keep going, you\'re doing amazing'
    ],
    emojis: ['✨', '🌟', '💫', '🌈', '🦋', '🌻', '🌙', '💛']
  },
  minimalist: {
    prefix: [
      'Simplicity seeker',
      'Less is more',
      'Minimalist mindset',
      'Intentional living',
      'Quality over quantity',
      'Essentialist',
      'Mindful minimalist',
      'Simple pleasures advocate'
    ],
    middle: [
      'living with less, experiencing more',
      'curating a meaningful life',
      'finding beauty in simplicity',
      'choosing what truly matters',
      'decluttering mind and space',
      'embracing the essential',
      'simplifying to amplify',
      'focusing on what counts'
    ],
    suffix: [
      'Less stuff, more life',
      'Simplicity is the ultimate sophistication',
      'Clear space, clear mind',
      'Living intentionally',
      'Quality moments over material things',
      'Minimalism is freedom',
      'Enough is abundance',
      'Simple living, high thinking'
    ],
    emojis: ['🤍', '🌿', '☁️', '🕊️', '🧘', '🍃', '⚪', '✨']
  }
};

const platformEmojis: Record<Platform, string[]> = {
  instagram: ['📸', '💕', '🌺', '✨', '🌟'],
  twitter: ['🐦', '💬', '🔥', '👀', '⚡'],
  tiktok: ['🎵', '🎬', '💃', '🎭', '🔥'],
  linkedin: ['💼', '🎯', '📊', '🚀', '💡']
};

export interface BioOptions {
  style: BioStyle;
  platform: Platform;
  keywords?: string[];
  includeEmojis?: boolean;
  length?: 'short' | 'medium' | 'long';
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateBio(options: BioOptions): string {
  const { style, platform, keywords = [], includeEmojis = true, length = 'medium' } = options;
  const template = bioTemplates[style];
  
  let bio = '';
  
  // Build bio structure based on length
  if (length === 'short') {
    bio = `${getRandomItem(template.prefix)} | ${getRandomItem(template.middle)}`;
  } else if (length === 'medium') {
    bio = `${getRandomItem(template.prefix)} ${getRandomItem(template.middle)}. ${getRandomItem(template.suffix)}.`;
  } else {
    // long
    const prefix = getRandomItem(template.prefix);
    const middle = getRandomItem(template.middle);
    const suffix = getRandomItem(template.suffix);
    const extraDetail = getRandomItem(template.middle);
    bio = `${prefix} ${middle}. ${extraDetail}. ${suffix}.`;
  }
  
  // Add keywords if provided
  if (keywords.length > 0) {
    const keywordString = keywords.slice(0, 3).join(' • ');
    bio += `\n\n${keywordString}`;
  }
  
  // Add emojis
  if (includeEmojis) {
    const styleEmojis = getRandomItems(template.emojis, 2);
    const platEmojis = getRandomItems(platformEmojis[platform], 1);
    const allEmojis = [...styleEmojis, ...platEmojis];
    bio = `${allEmojis.join(' ')} ${bio}`;
  }
  
  return bio;
}

export function generateMultipleBios(options: BioOptions, count: number = 3): string[] {
  const bios: string[] = [];
  const seenBios = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = count * 10;
  
  while (bios.length < count && attempts < maxAttempts) {
    const bio = generateBio(options);
    if (!seenBios.has(bio)) {
      seenBios.add(bio);
      bios.push(bio);
    }
    attempts++;
  }
  
  return bios;
}

export const bioStyleDescriptions: Record<BioStyle, string> = {
  professional: 'Perfect for LinkedIn and business profiles',
  creative: 'Ideal for artists, designers, and creatives',
  funny: 'Humorous and relatable for casual platforms',
  inspirational: 'Motivational and uplifting vibes',
  minimalist: 'Clean, simple, and intentional'
};

export const platformDescriptions: Record<Platform, string> = {
  instagram: 'Visual-focused, lifestyle content',
  twitter: 'Short, punchy, and conversational',
  tiktok: 'Trendy, fun, and engaging',
  linkedin: 'Professional networking and career'
};
