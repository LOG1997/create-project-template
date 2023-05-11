import { useUserStore } from './user';

export  function useStore() {
  
  return {
    user: useUserStore(),
  };
  
}


