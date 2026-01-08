const Header = () => {
  return (
    <header
      className="py-3 px-4 sm:py-5 sm:px-6 rounded-2xl bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white"
      role="banner"
    >
      <p className="text-lg sm:text-xl font-semibold">Elevate</p>
      <h1 className="text-base sm:text-xl md:text-2xl font-semibold flex-1 text-center">
        Frontend Advanced Bootcamp Task
      </h1>
    </header>
  );
};

export default Header;
