import Script from 'next/script';

const SORO_EMBED_SRC = 'https://app.trysoro.com/api/embed/0c8cac65-0917-4709-a7b9-7d0aced09806';

export default function SoroEmbed() {
  return (
    <>
      <div id="soro-blog" />
      <Script src={SORO_EMBED_SRC} strategy="afterInteractive" />
    </>
  );
}
