/// <reference path='node_modules/@league-of-foundry-developers/foundry-vtt-types/index.d.mts'>
import Mystification from "./mystification.js"

class MystificationRules extends FormApplication
{
    static get defaultOptions()
    {
        const defaults = super.defaultOptions;
        const /** @type {FormApplicationOptions} */ overrides = {
            height: 'auto',
            id: Mystification.Menus.Rules,
            template: Mystification.Templates.Rules,
            title: 'Mystification Rules',
            width: 250
        }

        return foundry.utils.mergeObject(defaults, overrides);
    }
}

export default MystificationRules;