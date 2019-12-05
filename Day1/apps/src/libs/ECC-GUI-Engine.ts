

import { UIUtils, UIButton, UILed, UIWrapper, UIPanel, UILayout, UIText, UIGauge, UIKnob, AIotEngine,LED, PSW, ADC } from './UICore';


export { UIUtils, UIButton, UILed, UIWrapper, UIPanel, UILayout, UIText, UIGauge, UIKnob, AIotEngine, LED, PSW, ADC}

/**
 * Interfaces
 */


 /**
  * UIPanelOptions
  */
interface UIPanelOptions {
    text?:      string;
    className?: string;
    parentId?:  string;
    panelId?:   string;
    iconLeft?:  string;
    iconRight?: string;
    useInline?: boolean;
}

/**
 * UILayoutOptions
 */
interface UILayoutOptions {
    parentId?:  string;
    className?: string;
    layoutId?:  string;
    rows?:      number;
    cols?:      number;
}

 /**
  * UIButtonOptions
  */
interface UIButtonOptions {
    text?:      string;
    className?: string;
    callback?:  (e: MouseEvent) => void;
    parentId?:  string;
    buttonId?:  string;
    useInline?: boolean;
    iconLeft?:  string;
    iconRight?: string;
}

/**
 * UILedOptions
 */
interface UILedOptions {
    className?:     string;
    parentId?:      string;
    ledId?:         string;
    useInline?:     boolean;
}


 /**
  * UITextOptions
  */
interface UITextOptions {
    text?:      string;
    className?: string;
    parentId?:  string;
    textId?:    string;
    iconLeft?:  string;
    iconRight?: string;
    useInline?: boolean;
    textAlign?: string;
}

/**
 * UIGaugeOptions
 */
interface UIGaugeOptions {
    min?:       number;
    max?:       number;
    val?:       number;
    size?:      number;
    parentId?:  string;
    gaugeId?:   string;
    hue?:       number;
    saturation?:number;
    ligthness?: number;
    useInline?: boolean;
    useAdaptiveColor?: boolean;
}

/**
 * UIKnobOptions
 */
interface UIKnobOptions {
    min?:       number;
    max?:       number;
    val?:       number;
    size?:      number;
    parentId?:  string;
    knobId?:    string;
    hue?:       number;
    saturation?:number;
    ligthness?: number;
    useInline?: boolean;
    useAdaptiveColor?: boolean;
    callback?: (val: number, id: string) => void
}

const UIEningVersion = 'v1.1';

export default class UIEngine{

    /**
     * UIEngine Constructor
     */
    constructor() {
        console.log(`%cUIEngine ${UIEningVersion} loaded`, `color: blue`)
    }


    /**
     * Create Panel
     * @param options Options to create ui-panel
     */

    createPanel(options: UIPanelOptions) {
        return new UIPanel(options);
    }


    /**
     * Create Layout
     * @param options Options to create ui-layout
     */
    createLayout(options: UILayoutOptions) {
        return new UILayout(options);
    }


    /**
     * Create Button
     * @param options Options to create ui-button
     */
    createButton(options: UIButtonOptions) {
        return new UIButton(options);
    }


    /**
     * Create Led
     * @param options Options to create ui-led
     */
    createLed(options: UILedOptions) {
        return new UILed(options);
    }


    /**
     * Create Text
     * @param options Options to create ui-text
     */
    createText(options: UITextOptions) {
        return new UIText(options);
    }


    /**
     * Create Gauge
     * @param options Options to create ui-gauge
     */
    createGauge(options: UIGaugeOptions) {
        return new UIGauge(options);
    }


    /**
     * Create Knob
     * @param options Options to create ui-knob
     */
    createKnob(options: UIKnobOptions) {
        return new UIKnob(options);
    }
}

export { UIEngine }
