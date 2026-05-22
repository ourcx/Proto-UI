import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asOverlay } from '@proto.ui/hooks';
import { TOOLTIP_CONTEXT, TOOLTIP_FAMILY } from './shared';
import type {
  TooltipContentAsHookContract,
  TooltipContentExposes,
  TooltipContentProps,
} from './types';

function setupTooltipContent(def: DefHandle<TooltipContentProps, TooltipContentExposes>): void {
  def.anatomy.claim(TOOLTIP_FAMILY, { role: 'content' });

  const overlay = asOverlay({
    closeOnEscape: true,
    closeOnOutsidePress: false,
    closeOnFocusOutside: false,
    restore: 'trigger',
    entry: 'content',
    meta: {
      overlayKind: 'tooltip',
    },
  });
  const open = def.state.bool('open', false);

  def.expose.state('open', open);

  const deriveOpen = (ctx: { triggerHovered: boolean; triggerFocused: boolean }) =>
    ctx.triggerHovered || ctx.triggerFocused;

  def.context.subscribe(TOOLTIP_CONTEXT, (_run, next) => {
    const nextOpen = deriveOpen(next);
    open.set(nextOpen, 'reason: tooltip context sync => content open');
    if (nextOpen) {
      overlay.openOverlay('trigger.hover');
    } else {
      overlay.close('controlled.sync');
    }
  });

  def.lifecycle.onMounted((run) => {
    const ctx = run.context.read(TOOLTIP_CONTEXT);
    const nextOpen = deriveOpen(ctx);
    open.set(nextOpen, 'reason: lifecycle.onMounted => tooltip content open sync');
    if (nextOpen) {
      overlay.openOverlay('trigger.hover');
    } else {
      overlay.close('controlled.sync');
    }
  });

  def.rule({
    when: (w: any) => w.state(open).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });
}

export const asTooltipContent = defineAsHook<
  TooltipContentProps,
  TooltipContentExposes,
  TooltipContentAsHookContract
>({
  name: 'as-tooltip-content',
  mode: 'once',
  setup: setupTooltipContent,
});

const tooltipContent = definePrototype({
  name: 'base-tooltip-content',
  setup(def) {
    setupTooltipContent(def);
    def.feedback.style.use(tw('absolute left-0 top-full z-40 mt-1'));
  },
});

export default tooltipContent;
