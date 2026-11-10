import { useId } from 'react';

/** React's useId contains colons, which break url(#id) references in some browsers. */
export function useSvgId(prefix) {
  return `${prefix}-${useId().replace(/:/g, '')}`;
}
