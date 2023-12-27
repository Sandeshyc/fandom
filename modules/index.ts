import MovieListReel from "@/modules/components/MovieListReel";

const comps = {
    roll : MovieListReel,
}

const getComponent = (compName : string) => comps[compName as keyof typeof comps];

export {getComponent}