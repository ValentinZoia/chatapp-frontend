
interface DocumentHeadProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

export function DocumentHead({ title, description, image, children }: DocumentHeadProps) {
  const fullTitle = title ? `${title} | Futbol Chat` : 'Futbol Chat';

  return (
    <>
      <title>{fullTitle}</title>
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}
      <meta property="og:title" content={fullTitle} />
      {image && <meta property="og:image" content={image} />}
      {children}
    </>
  );
}
