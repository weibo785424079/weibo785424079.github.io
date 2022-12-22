import { useState } from 'react';
import { useUpdate } from '@tms/site-hook';

export type Types = 'sync' | 'queue' | 'view';

export default class AnchorLoadExector {
  static useExector() {
    const update = useUpdate();
    return useState(() => new AnchorLoadExector().init(update))[0];
  }

  private update: Function;

  private loaded: { [key: string]: boolean } = {};

  private syncs: string[] = [];

  private queues: string[] = [];

  private views: string[] = [];

  collect(type: Types, id: string, visible: boolean) {
    this[`${type}s`].push(id);
    this.loaded[id] = visible;
  }

  unCollect(type: Types, id: string) {
    const list = this[`${type}s`];
    const index = list.findIndex((item) => item === id);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.update();
  }

  init(update: Function) {
    this.update = update;
    return this;
  }

  get ready() {
    return [...this.syncs, ...this.views, ...this.queues].every((id) => this.loaded[id]);
  }

  mount() {
    const id = this.queues[0];
    if (id) {
      this.load(id);
    } else {
      this.update();
    }
  }

  load(id: string) {
    if (this.hasLoad(id)) return;
    this.loaded[id] = true;
    this.update();
  }

  /**
   * 加载 类型 queue 的下一个
   */
  loadNext() {
    const id = this.queues.find((item) => !this.loaded[item]);
    if (id) this.load(id);
  }

  /**
   * 加载全部子组件
   */
  loadAll() {
    [...this.syncs, ...this.views, ...this.queues].forEach((key) => {
      this.loaded[key] = true;
    });
    this.update();
  }

  /**
   * @param id string
   * @description 是否有加载
   */
  hasLoad(id: string) {
    return this.loaded[id];
  }
}
