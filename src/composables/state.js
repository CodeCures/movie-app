import { useLocalStorage } from "@vueuse/core"

export const useState = (stateName) => {
  const state = useLocalStorage(stateName, []);

  function setItem(payload) {
    state.value.push({ ...payload })
  }


  return {
    state,
    setItem
  }
}
