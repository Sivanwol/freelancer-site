import Script from 'next/script';

const SORO_EMBED_SRC = 'https://app.trysoro.com/api/embed/cba1e92c-70c0-4f06-9f93-6fc454e7a2d0';

export default function SoroEmbed() {
  return (
    <>
      <div id="soro-blog"></div>
      <Script src={SORO_EMBED_SRC} strategy="afterInteractive" />
    </>
  );
}
