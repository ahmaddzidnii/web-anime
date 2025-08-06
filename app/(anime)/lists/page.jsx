import { Suspense } from "react";

import { ListAnime } from "@/components/list/list-anime";

export const metadata = {
  title: "My List",
};

const ListPage = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<></>}>
        <ListAnime />
      </Suspense>
    </div>
  );
};

export default ListPage;
