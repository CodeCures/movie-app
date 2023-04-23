import { ref } from 'vue';
import { useState } from './state';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "vue-toastification";

export function useCollection() {
  const { state: myCollections } = useState('my-collections');
  const collection = ref({ id: null, name: '', movies: [] });

  function createMovieList() {
    collection.value.id = uuidv4();
    myCollections.value.push({ ...collection.value })
    collection.value.name = ''

    useToast().success('collection created successfully!');
  }

  function addToMyCollection(collectionId, movie) {
    const index = myCollections.value.findIndex(col => col.id === collectionId);

    if (index !== -1) {
      myCollections.value[index].movies.push(movie);
    }

    useToast().success('Movie added to collection successfully!');
  }

  function getMovieCollection(collectionId) {
    collection.value = myCollections.value.find(col => col.id == collectionId);
  }

  return {
    myCollections,
    collection,
    createMovieList,
    addToMyCollection,
    getMovieCollection
  };
}
