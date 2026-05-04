import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ restaurantId: string }>;
};

async function getRestaurantData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant/${id}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).restaurantId;
  const restaurant = await getRestaurantData(id);

  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${restaurant.name} | Order Online`,
    description: restaurant.slogan || `Order delicious food from ${restaurant.name}. View our menu and order online for eat-in or take-out.`,
    openGraph: {
      title: `${restaurant.name} - Official Online Menu`,
      description: restaurant.slogan || `Order delicious food from ${restaurant.name}.`,
      images: [restaurant.thumbnail, ...previousImages],
    },
    keywords: [restaurant.name, 'food', 'online order', 'menu', restaurant.address].filter(Boolean),
    alternates: {
      canonical: `/${id}`,
    }
  };
}

export default async function RestaurantLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ restaurantId: string }>;
}) {
  const id = (await params).restaurantId;
  const restaurant = await getRestaurantData(id);

  const jsonLd = restaurant ? {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    image: restaurant.thumbnail,
    description: restaurant.slogan,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address,
    },
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${id}`,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
