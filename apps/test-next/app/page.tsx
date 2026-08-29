import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Static Image Pipeline - Test App</h1>
      <p>Test different image optimization techniques:</p>
      <ul>
        <li>
          <Link href="/demos/blur-up">Blur-up</Link>
        </li>
        <li>
          <Link href="/demos/clustering">Clustering</Link>
        </li>
        <li>
          <Link href="/demos/responsive">Responsive</Link>
        </li>
        <li>
          <Link href="/demos/aspect-ratio">Aspect Ratio</Link>
        </li>
        <li>
          <Link href="/demos/synthetic">Synthetic</Link>
        </li>
      </ul>
    </main>
  );
}
