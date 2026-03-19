import { blogPosts } from '@/lib/blog-data';
import BlogPostPage from './client-page';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page() {
  return <BlogPostPage />;
}
