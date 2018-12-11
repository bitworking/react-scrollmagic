import { Component, ReactNode } from 'react'

interface ControllerProps {
  container?: string | object
  vertical?: boolean
  globalSceneOptions?: object
  loglevel?: number
  refreshInterval?: number
}

interface PinSettings {
  pushFollowers?: boolean
  spacerClass?: string
}

interface SceneProps {
  children: ((progress: number) => ReactNode) | ReactNode
  duration?: string | number
  offset?: string | number
  triggerElement?: string | object | null
  triggerHook?: string | number
  reverse?: boolean
  loglevel?: number
  indicatrs?: boolean
  classToggle?: string | [string, string]
  pin?: boolean | string
  pinSettings?: PinSettings
}

export class Controller extends Component<ControllerProps> {}

export class Scene extends Component<SceneProps> {}
