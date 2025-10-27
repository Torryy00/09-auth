import { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: "https://08-zustand-two-alpha.vercel.app",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found',
      }
    ]
  }
};

    const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className={css.link}>Go back home</Link>
    </div>
  );
};

export default NotFound;

