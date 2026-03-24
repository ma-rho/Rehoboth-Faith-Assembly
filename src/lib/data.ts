import type { Sermon, Event, Pastor } from './types';

export const sermons: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Forgiveness',
    preachedDate: '2024-07-21',
    youtubeVideoId: 'G_o_z8h2M5c', // Placeholder video ID
    speaker: 'Pastor John Doe',
  },
  {
    id: '2',
    title: 'Living a Life of Purpose',
    preachedDate: '2024-07-14',
    youtubeVideoId: 'G_o_z8h2M5c',
    speaker: 'Pastor John Doe',
  },
  {
    id: '3',
    title: 'Faith in Times of Trouble',
    preachedDate: '2024-07-07',
    youtubeVideoId: 'G_o_z8h2M5c',
    speaker: 'Pastor John Doe',
  },
  {
    id: '4',
    title: 'The Joy of Giving',
    preachedDate: '2024-06-30',
    youtubeVideoId: 'G_o_z8h2M5c',
    speaker: 'Guest Speaker Jane Smith',
  },
  {
    id: '5',
    title: 'Understanding Grace',
    preachedDate: '2024-06-23',
    youtubeVideoId: 'G_o_z8h2M5c',
    speaker: 'Pastor John Doe',
  },
  {
    id: '6',
    title: 'Building a Stronger Community',
    preachedDate: '2024-06-16',
    youtubeVideoId: 'G_o_z8h2M5c',
    speaker: 'Pastor John Doe',
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer BBQ & Family Fun Day',
    date: '2024-08-10T12:00:00Z',
    description: 'Join us for a day of food, fun, and fellowship. We\'ll have games for all ages, delicious BBQ, and great company. It\'s a perfect opportunity to connect with the community.',
    location: 'Church Park',
    imageUrl: 'https://picsum.photos/seed/event1/600/400',
    imageHint: 'family picnic',
  },
  {
    id: '2',
    title: 'Youth Summer Camp',
    date: '2024-08-15T09:00:00Z',
    description: 'A week-long camp for our youth group (ages 12-18) filled with activities, worship, and learning about God\'s word in a beautiful mountain setting.',
    location: 'Mountain Retreat Center',
    imageUrl: 'https://picsum.photos/seed/event2/600/400',
    imageHint: 'youth camp',
  },
  {
    id: '3',
    title: 'Community Outreach Day',
    date: '2024-09-07T10:00:00Z',
    description: 'We\'re partnering with local shelters to provide meals and support. Volunteers are needed to help prepare and serve food. Sign up in the lobby.',
    location: 'Downtown Community Shelter',
    imageUrl: 'https://picsum.photos/seed/event3/600/400',
    imageHint: 'volunteers serving',
  },
];

export const pastor: Pastor = {
  name: 'Pastor John Doe',
  title: 'Lead Pastor',
  bio: 'Pastor John Doe has been leading Rehoboth Connect with a passion for God\'s word and a heart for the community since 2010. He and his wife, Jane, have three children and are dedicated to creating a church family where everyone feels loved, valued, and empowered to live out their faith. Pastor John holds a Master of Divinity from Grace Theological Seminary and finds joy in hiking, reading, and spending time with his family.',
};
