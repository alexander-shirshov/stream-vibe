import { Helmet } from 'react-helmet-async';

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>Stream Vibe | About</title>
        <meta name="description" content="О проекте Stream Vibe" />
      </Helmet>

      <h1>About page</h1>
    </>
  );
}
