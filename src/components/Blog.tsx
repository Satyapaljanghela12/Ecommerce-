import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export default function Blog() {
  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'Top 5 Tips for Online Shopping',
      excerpt: 'Discover the best practices to save money and find quality products while shopping online.',
      author: 'Sarah Johnson',
      date: 'Nov 8, 2024',
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Shopping',
    },
    {
      id: '2',
      title: 'Seasonal Trends for Winter 2024',
      excerpt: 'Stay ahead of the fashion curve with our guide to the hottest winter trends and must-have items.',
      author: 'Emily Chen',
      date: 'Nov 6, 2024',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Trends',
    },
    {
      id: '3',
      title: 'Sustainable Shopping Guide',
      excerpt: 'Learn how to make eco-friendly choices while enjoying your favorite products and brands.',
      author: 'Michael Green',
      date: 'Nov 4, 2024',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lifestyle',
    },
  ];

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h2>
        <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
          Read all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {post.category}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition-colors font-medium text-sm">
                Read More
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
