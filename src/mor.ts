// import * as warning from 'warning'
import * as invariant from 'invariant'
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import { gStore } from './globalStore'
import * as withMobx from './withMobx'

/**
 * 状态的生命周期种类
 * - 全局
 * - 随组件
 * - 随路由（自定义路由 comparer 决定销毁）
 *
 * 状态的创建
 * - 钩子函数（注册到全局 model 中）
 *
 * 状态的销毁
 * - 钩子函数（注册到全局 model 中）
 *
 * 全局状态
 * - 全局状态之间的通信
 * - 全局状态的状态释放
 * - 命名空间管理
 *
 * 局部状态
 * - 局部状态注册为全局状态
 *
 * 局部状态 <-> 全局状态
 * - 局部状态注册为全局的状态
 */

type morType = 'global' | 'route' | 'local'

interface IModel {
  type: morType
  state: any
  namespace?: string
}

class Mor {
  private _state: any

  public model = (options: IModel) => {
    const { type, namespace, state } = options
    // TODO: better code needed
    if (['global', 'route', 'local'].indexOf(type) < 0) {
      throw Error(`[mor]: not invalid state type, type only support 'global', 'route' and 'local'`)
    }
    switch (type) {
      case 'global':
        invariant(namespace, `[mor]: not invalid state type, type only support 'global', 'route' and 'local'`)
        this.addToGlobalState(namespace!, state)
        break
      case 'route':
        this.initRouteState(state)
      case 'local':
        this.initLocalState(state)
        break
    }
    return this
  }

  get state() {
    return this._state
  }

  private addToGlobalState = (namespace: string, state: any) => {
    gStore.addNamespace(namespace, state)
  }

  private initRouteState = (state: any) => {}

  private initLocalState = (state: any) => {
    this._state = state
  }
}

const createMorModel = options => {
  return new Mor()
}

export { createMorModel }
