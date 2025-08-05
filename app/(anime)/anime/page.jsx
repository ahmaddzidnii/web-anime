import { AnimeAll } from "./_components/anime-explore";

export const metadata = {
  title: "Anime",
};

const AnimePage = () => {
  return (
    <div className="min-h-screen w-full px-2 pt-5 2xl:px-0">
      {/* <PopularAnime />
      <AnimeAnak /> */}
      <AnimeAll />
    </div>
  );
};

export default AnimePage;
