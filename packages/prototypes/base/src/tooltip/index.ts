import tooltipRoot from './root';

export type {
  TooltipContentAsHookContract,
  TooltipContentExposes,
  TooltipContentProps,
  TooltipContentStateHandles,
  TooltipRootAsHookContract,
  TooltipRootExposes,
  TooltipRootProps,
  TooltipRootStateHandles,
  TooltipTriggerAsHookContract,
  TooltipTriggerExposes,
  TooltipTriggerProps,
} from './types';
export type { TooltipContextValue } from './shared';

export { TOOLTIP_CONTEXT, TOOLTIP_FAMILY } from './shared';
export { asTooltipRoot, default as tooltipRoot } from './root';
export { asTooltipTrigger, default as tooltipTrigger } from './trigger';
export { asTooltipContent, default as tooltipContent } from './content';

export default tooltipRoot;
