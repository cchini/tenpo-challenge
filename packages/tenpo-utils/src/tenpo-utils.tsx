// Axios rest
import { useAsync } from './hooks/rest/useAsyncAxios';
import useFetchAndLoad from './hooks/rest/useFetchAndLoad';
import * as axiosServices from './hooks/rest/axiosServices';
import { loadAbort } from './utils/rest/loadAbort';
// event-handlers
import { useIsMobile } from './hooks/event-handlers/useIsMobile';
import { useClickOutside } from './hooks/event-handlers/useClickOutside';
import { useDebounce } from './hooks/event-handlers/useDebounce';
import type AxiosCall from './hooks/rest/useFetchAndLoad';

// Export
const eventHandlers = {
  useIsMobile,
  useClickOutside,
  useDebounce,
};

const rest = {
  useAsync,
  useFetchAndLoad,
  axiosServices,
  loadAbort,
};

export { eventHandlers, rest };
export type { AxiosCall };
