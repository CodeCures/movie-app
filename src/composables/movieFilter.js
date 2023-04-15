import { storeToRefs } from "pinia";
import { useMovieStore } from "../stores/movie";
import { reactive, watch } from "vue";

export function useMovieFilter() {
  const { filter } = storeToRefs(useMovieStore());

  const searchQuery = reactive({ type: 'search', param: null });


  watch(searchQuery, newSearchQuery => {
    filter.value = newSearchQuery;
  });


  const orderBy = (param) => {
    filter.value = { type: 'sort', param };
  };

  return {
    searchQuery,
    orderBy
  };
}
