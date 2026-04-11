import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Stream Vibe | Home</title>
        <meta name="description" content="Главная страница Stream Vibe" />
      </Helmet>

      <h1>Главная</h1>
    </>
  );
}
