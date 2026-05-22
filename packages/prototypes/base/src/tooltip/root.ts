import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { asOpenState } from '../tools';
import { TOOLTIP_CONTEXT, TOOLTIP_FAMILY, type TooltipContextValue } from './shared';
import type { TooltipRootAsHookContract, TooltipRootExposes, TooltipRootProps } from './types';

function deriveOpen(ctx: TooltipContextValue): boolean {
  return ctx.triggerHovered || ctx.triggerFocused;
}

function sameContext(a: TooltipContextValue, b: TooltipContextValue): boolean {
  return (
    a.open === b.open &&
    a.controlled === b.controlled &&
    a.disabled === b.disabled &&
    a.triggerHovered === b.triggerHovered &&
    a.triggerFocused === b.triggerFocused
  );
}

function setupTooltipRoot(def: DefHandle<TooltipRootProps, TooltipRootExposes>): void {
  def.anatomy.claim(TOOLTIP_FAMILY, { role: 'root' });

  const updateContext = def.context.provide(TOOLTIP_CONTEXT, {
    open: false,
    controlled: false,
    disabled: false,
    triggerHovered: false,
    triggerFocused: false,
  });

  const openState = asOpenState({
    exposeOpenMethodKey: 'openTooltip',
  });
  const open = openState.getState?.('open');

  const initialContext: TooltipContextValue = {
    open: false,
    controlled: false,
    disabled: false,
    triggerHovered: false,
    triggerFocused: false,
  };
  let snapshot: TooltipContextValue = initialContext;
  let published: TooltipContextValue = initialContext;

  const syncContext = () => {
    const next = {
      ...snapshot,
      open: open?.get() ?? false,
    };
    snapshot = next;
    if (sameContext(published, next)) return;
    published = next;
    updateContext(next);
  };

  def.context.subscribe(TOOLTIP_CONTEXT, (_run, next) => {
    snapshot = next;
    published = next;
    const nextOpen = deriveOpen(snapshot);
    if (open?.get() !== nextOpen) {
      open?.set(nextOpen, 'tooltip context sync');
    }
  });

  def.lifecycle.onCreated((run) => {
    snapshot = {
      ...snapshot,
      controlled: false,
      disabled: !!run.props.get().disabled,
    };
    syncContext();
  });

  def.props.watch(['disabled'], (_run, next) => {
    snapshot = {
      ...snapshot,
      disabled: !!next.disabled,
    };
    syncContext();
  });

  open?.watch((_run, event) => {
    if (event.type !== 'next') return;
    syncContext();
  });
}

export const asTooltipRoot = defineAsHook<
  TooltipRootProps,
  TooltipRootExposes,
  TooltipRootAsHookContract
>({
  name: 'as-tooltip-root',
  mode: 'once',
  setup: setupTooltipRoot,
});

const TooltipRoot = definePrototype({
  name: 'base-tooltip-root',
  setup(def) {
    setupTooltipRoot(def);
    def.feedback.style.use(tw('relative inline-flex items-start'));
  },
});

export default TooltipRoot;
