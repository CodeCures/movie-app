import { storeToRefs } from "pinia";
import { useMovieStore } from "../stores/movie";
import { reactive } from "vue";

export function useMovieFilter() {
  const { filter } = storeToRefs(useMovieStore());

  const searchQuery = reactive({ type: 'search', param: null });


  const filterBy = (query) => filter.value = { ...query };


  const orderBy = (param) => {
    filter.value = { type: 'sort', param };
  };

  return {
    searchQuery,
    orderBy,
    filterBy
  };
}
