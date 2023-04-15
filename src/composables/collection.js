import { reactive } from 'vue';
import { useState } from './state';
import { v4 as uuidv4 } from 'uuid';

export function useCollection() {
  const { state: myCollections } = useState('my-collections');
  const collection = reactive({ id: null, name: '', movies: [] });

  function createMovieList() {
    collection.id = uuidv4();
    myCollections.value.push({ ...collection })
    collection.name = ''
  }

  function addToMyCollection(collectionId, movie) {
    const index = myCollections.value.findIndex(col => col.id === collectionId);

    if (index !== -1) {
      myCollections.value[index].movies.push(movie);
    }
  }

  return {
    myCollections,
    collection,
    createMovieList,
    addToMyCollection
  };
}
