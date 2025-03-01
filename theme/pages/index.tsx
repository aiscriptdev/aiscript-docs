import LandingPage from '../components/Landingpage';

const CopyRight = () => {
  return (
    <footer className="bottom-0 mt-12 py-8 px-6 sm:p-8 w-full border-t border-solid border-divider-light">
      <div className="m-auto w-full text-center">
        <div className="font-medium text-sm text-text-2">
          <p className="mb-2">
            AISCript is free and open source language designed for human and AI released under the MIT
            license.
          </p>
          <p>© 2024-present AISCript Community.</p>
        </div>
      </div>
    </footer>
  );
};

export function HomeLayout() {
  return (
    <>
      <LandingPage />
      <CopyRight />
    </>
  );
}
