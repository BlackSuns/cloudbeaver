/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2022 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { UserDataService } from '@cloudbeaver/core-authentication';
import { Bootstrap, injectable } from '@cloudbeaver/core-di';
import { ActionService, ACTION_COLLAPSE_ALL, ACTION_FILTER, IAction, IDataContextProvider, KeyBindingService } from '@cloudbeaver/core-view';

import { ConnectionSchemaManagerService } from '../TopNavBar/ConnectionSchemaManager/ConnectionSchemaManagerService';
import { ACTION_LINK_OBJECT } from './ElementsTree/ACTION_LINK_OBJECT';
import { DATA_CONTEXT_ELEMENTS_TREE } from './ElementsTree/DATA_CONTEXT_ELEMENTS_TREE';
import  { ElementsTreeToolsMenuService } from './ElementsTree/ElementsTreeTools/ElementsTreeToolsMenuService';
import { createElementsTreeSettings, validateElementsTreeSettings } from './ElementsTree/ElementsTreeTools/NavigationTreeSettings/createElementsTreeSettings';
import { DATA_CONTEXT_NAV_TREE_ROOT } from './ElementsTree/ElementsTreeTools/NavigationTreeSettings/DATA_CONTEXT_NAV_TREE_ROOT';
import { KEY_BINDING_ENABLE_FILTER } from './ElementsTree/ElementsTreeTools/NavigationTreeSettings/KEY_BINDING_ENABLE_FILTER';
import { KEY_BINDING_COLLAPSE_ALL } from './ElementsTree/KEY_BINDING_COLLAPSE_ALL';
import { KEY_BINDING_LINK_OBJECT } from './ElementsTree/KEY_BINDING_LINK_OBJECT';
import { getNavigationTreeUserSettingsId } from './getNavigationTreeUserSettingsId';

@injectable()
export class NavigationTreeBootstrap extends Bootstrap {
  constructor(
    private readonly actionService: ActionService,
    private readonly keyBindingService: KeyBindingService,
    private readonly userDataService: UserDataService,
    private readonly connectionSchemaManagerService: ConnectionSchemaManagerService,
    private readonly elementsTreeToolsMenuService: ElementsTreeToolsMenuService
  ) {
    super();
  }

  register(): void | Promise<void> {
    this.elementsTreeToolsMenuService.register();
  }

  private switchFilter(contexts: IDataContextProvider, action: IAction) {
    const context = contexts.get(DATA_CONTEXT_NAV_TREE_ROOT);

    if (context === undefined) {
      return;
    }

    const state = this.userDataService.getUserData(
      getNavigationTreeUserSettingsId(context),
      createElementsTreeSettings,
      validateElementsTreeSettings
    );

    state.filter = !state.filter;
  }

  private elementsTreeActionHandler(contexts: IDataContextProvider, action: IAction) {
    const tree = contexts.get(DATA_CONTEXT_ELEMENTS_TREE);

    if (tree === undefined) {
      return;
    }

    switch (action) {
      case ACTION_COLLAPSE_ALL:
        tree.collapse();
        break;
      case ACTION_LINK_OBJECT: {
        const activeNavNode = this.connectionSchemaManagerService.activeNavNode;

        if (activeNavNode && activeNavNode.path.includes(tree.baseRoot)) {
          tree.show(
            activeNavNode.nodeId,
            activeNavNode.path
          );
        }
      }
        break;
    }
  }


  async load(): Promise<void> { }
}