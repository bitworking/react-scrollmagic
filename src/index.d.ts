declare module 'react-scrollmagic' {
  import * as React from 'react';

  export type ControllerProps = {
    children: React.ReactNode,
    container?: any,
    vertical?: boolean,
    globalSceneOptions?: any,
    loglevel?: number,
    refreshInterval?: number,

  };

  export type ControllerState = {
    controller: any | null,

  };

  export type PinSettings = {
    pushFollowers?: boolean,
    spacerClass?: string,

  };

  export type SceneProps = {
    children: React.ReactNode | Function,

    // scene parameters
    duration?: number | string,
    offset?: number | string,
    triggerElement?: string | object,
    triggerHook?: number | string,
    reverse?: boolean,
    loglevel?: number,
    indicators?: boolean,
    enabled?: boolean,
    progressEvents?: boolean,

    /* setClassToggle */
    classToggle?: string | string[],

    /* setPin */
    pin?: boolean | PinSettings,

  };

  export class Controller extends React.Component<ControllerProps, ControllerState> {}
  export class Scene extends React.PureComponent<SceneProps> {}
}
