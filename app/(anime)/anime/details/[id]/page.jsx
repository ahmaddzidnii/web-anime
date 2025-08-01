import { GiPeriscope } from "react-icons/gi";

import { getDetailAnimeById } from "@/services/anime.service";

import { DetailComponent } from "./_components/detail-component";
import { AddList } from "@/components/list/add-list";
import { TitlesSection } from "./_components/titles-section";
import { Separator } from "@/components/ui/separator";
import { YtIframe } from "@/components/iframe/yt";

export async function generateMetadata({ params }) {
  const {id} = await params
  const detailsAnime = await getDetailAnimeById(id);
  return {
    title: detailsAnime ? `${detailsAnime?.title_english}` : "Tidak Ditemukan",
    description: detailsAnime ? `${detailsAnime?.synopsis}` : "Tidak Ditemukan",
  };
}
const Page = async ({ params }) => {
  const {id} = await params
  const detailsAnime = await getDetailAnimeById(id);

  if (!detailsAnime) {
    return (
      <div className="pt-5">
        <div className=" flex min-h-screen items-center justify-center gap-5">
          <GiPeriscope className="text-4xl" />
          <h1 className="mb-5 text-xl font-bold tracking-wide sm:text-2xl  md:text-3xl lg:text-4xl">
            Tidak ada hasil untuk id ini.
          </h1>
        </div>
      </div>
    );
  }


  const api = detailsAnime
  return (
    <main className="min-h-screen pt-5">
      <main className="space-y-5 p-1">
        <h1
          className=" text-lg font-bold lg:text-xl xl:text-2xl"
          title={api?.title}
        >
          {api?.title}
          <span className="italic" title={api?.title_japanese}>
            &#40;{api?.title_japanese}&#41;
          </span>
        </h1>
        <div className="flex flex-col justify-center gap-5 md:flex-row">
          <div className="shrink-0 md:w-[300px]">
            <img
              src={api?.images.jpg.large_image_url}
              className="w-full rounded-sm shadow-xl md:h-[400px]"
              alt={api?.title}
              title={api?.title}
            />
            <div className="mt-5">
              <AddList withText={true} data={api?.mal_id} />
            </div>

            {/* Trailer section */}
            <div className="mt-5">
              {api?.trailer.youtube_id && (
                <YtIframe
                  id={api?.trailer.youtube_id}
                  title={api?.title_japanese}
                />
              )}
            </div>
            {/* Trailer section */}

            <div className="mt-5">
              <TitlesSection titles={api?.titles} />
            </div>

            {/* Information section */}
            <div className="mt-5">
              <div className=" w-full rounded-lg bg-slate-300 p-5">
                <h1 className="text-lg   font-bold text-slate-800">
                  Information
                </h1>
                <Separator />
                <div className="my-2">
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Type</span> :
                    <span className="text-slate-600">{api?.type}</span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Genres</span> :
                    <span className="text-slate-600">
                      {api?.genres.map((g) => g.name).join(", ")}
                    </span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Episodes</span> :
                    <span className="text-slate-600">{api?.episodes}</span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Duration</span> :
                    <span className="text-slate-600">{api?.duration}</span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Status</span> :
                    <span className="text-slate-600">{api?.status}</span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Aired</span> :
                    <span className="text-slate-600">{api?.aired.string}</span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Producers</span> :
                    <span className="text-slate-600">
                      {api?.producers.map((p) => p.name).join(", ")}
                    </span>
                  </p>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">Rating</span> :
                    <span className="text-slate-600">{api?.rating}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Information section */}
          </div>

          <div className=" h-auto w-full">
            <DetailComponent detailData={api} />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Page;
