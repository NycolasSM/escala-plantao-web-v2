import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Escala De Plantão Digital</title>
        <meta name="Escala De Plantão Digital" content="Escala De Plantão Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <footer
        style={{
          bottom: 20,
          position: "absolute",
          left: "45%",
        }}
      >
        <a
          href="https://localsig.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.8,
          }}
        >
          Painel desenvolvido por LocalSIG
        </a>
      </footer>
    </>
  );
}
