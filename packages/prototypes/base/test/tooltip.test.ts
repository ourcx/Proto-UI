import { describe, expect, it } from 'vitest';
import { AdaptToWebComponent } from '@proto.ui/adapter-web-component';
import { tooltipContent, tooltipRoot, tooltipTrigger } from '../src/tooltip';

AdaptToWebComponent(tooltipRoot as any);
AdaptToWebComponent(tooltipTrigger as any);
AdaptToWebComponent(tooltipContent as any);

describe('prototypes/base: tooltip', () => {
  it('opens from trigger hover and closes when trigger is unhovered', async () => {
    const root = document.createElement('base-tooltip-root') as any;
    const trigger = document.createElement('base-tooltip-trigger') as any;
    const content = document.createElement('base-tooltip-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    // 初始是关闭的
    expect(root.getExposes().open.get()).toBe(false);
    expect(content.getExposes().open.get()).toBe(false);

    // hover trigger → 打开
    trigger.dispatchEvent(new Event('pointerenter'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.getExposes().open.get()).toBe(true);

    // 离开 trigger → 关闭
    trigger.dispatchEvent(new Event('pointerleave'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.getExposes().open.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });

  it('opens from trigger focus and closes on blur', async () => {
    const root = document.createElement('base-tooltip-root') as any;
    const trigger = document.createElement('base-tooltip-trigger') as any;
    const content = document.createElement('base-tooltip-content') as any;

    root.appendChild(trigger);
    root.appendChild(content);
    document.body.appendChild(root);

    await Promise.resolve();
    await Promise.resolve();

    // focus trigger → 打开
    trigger.dispatchEvent(new Event('focus'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(true);
    expect(content.getExposes().open.get()).toBe(true);

    // blur trigger → 关闭
    trigger.dispatchEvent(new Event('blur'));
    await Promise.resolve();

    expect(root.getExposes().open.get()).toBe(false);
    expect(content.getExposes().open.get()).toBe(false);

    root.remove();
    await Promise.resolve();
  });
});
