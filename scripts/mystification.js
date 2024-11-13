// <reference path='node_modules/@league-of-foundry-developers/foundry-vtt-types/index.d.mts'>
/// <reference path='node_modules/foundry-pf2e/types/foundry/index.d.ts'>
/// <reference path='node_modules/foundry-pf2e/types/foundry/common/documents/token.d.ts'>

import MystificationRules from "./rules.js";

class Mystification
{
    static Id = 'pf2e-npc-mystification'
    static Templates =
    {
        Rules: `modules/${this.Id}/templates/rules.hbs`
    }

    static Settings =
    {
        ShowHudIcon: 'showHudIcon',
        MystifyOnPlace: 'mystifyOnPlace',
        MystifyOnCombat: 'mystifyOnCombat',
        Rules: 'mystifyRules'
    }

    static Menus =
    {
        Rules: 'mystifyRules'
    }
    
    static log()
    {
        console.log(this.Id, '|', ...arguments);
    }
    
    static initialize()
    {
        this.log('initializing module');

        game.settings.register(this.Id, this.Settings.ShowHudIcon, {
            name: 'Show HUD Icon',
            hint: 'Shows an icon to mystify an NPC on their token HUD',
            config: true,
            type: Boolean,
            default: true,
            scope: 'world'
        });

        game.settings.register(this.Id, this.Settings.MystifyOnPlace, {
            name: 'Mystify on Place',
            hint: "Automatically mystify NPCs when they're placed on the scene",
            config: true,
            type: Boolean,
            default: true,
            scope: 'world'
        });

        game.settings.register(this.Id, this.Settings.MystifyOnCombat, {
            name: 'Mystify on Combat',
            hint: "Automatically mystify NPCs when combat starts, or they're added to an existing combat",
            config: true,
            type: Boolean,
            default: false,
            scope: 'world'
        });

        game.settings.register(this.Id, this.Settings.Rules, {
            name: 'Mystification Rules',
            hint: 'Rules to define automatic mystification',
            config: false,
            type: Array,
            default: [],
            scope: 'world'
        })

        game.settings.registerMenu(Mystification.Id, this.Menus.Rules, {
            name: 'Mystification Rules',
            label: 'Configure Rules',
            hint: 'Rules to define how a token is automatically mystified',
            icon: 'fas fa-eye-slash',
            type: MystificationRules,
            restricted: true
        });
    }

    /**
     * Hook for when a token's HUD renders.
     * @param {TokenHUD} hud 
     * @param {JQuery} $html
     * @param {BaseToken} token
     */
    static render(hud, $html, token)
    {
        const statusEffects = $html.find('.col.right .status-effects');
        const button = $('<div><i class="fas fa-eye-slash"></i></div>');
        button.addClass('control-icon')
        button.attr('title', game.i18n.localize('Mystification.button-title'));

        Mystification.log('button adding', button);
        Mystification.log(hud, token);

        const actor = game.actors.get(token.actorId);
        Mystification.log(actor);

        button.insertAfter(statusEffects);
        button.on('click', (event) =>
        {

        })
    }
}

Hooks.once('init', () => Mystification.initialize());
Hooks.on('renderTokenHUD', Mystification.render);

export default Mystification;