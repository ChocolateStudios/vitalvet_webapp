import { map } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';

export interface SubTab {
    id: string;
    title: string;
    viewId: string; // The identifier for the content to load (e.g., 'pet-details')
    params?: Record<string, string>; // e.g., { id: '123' }
    closable?: boolean;
}

export interface MainTab {
    id: string; // Unique instance ID (UUID)
    title: string;
    icon?: string;
    activeSubTabId: string;
    subTabs: SubTab[];
    isClosable: boolean;
}

export interface TabState {
    tabs: MainTab[];
    activeTabId: string | null;
}

export const tabsStore = map<TabState>({
    tabs: [],
    activeTabId: null,
});

// --- Actions ---

export const openTab = (
    title: string,
    viewId: string,
    params: Record<string, string> = {},
    subTabs: SubTab[] = [],
    options: { icon?: string; isClosable?: boolean; focus?: boolean } = {}
) => {
    const { tabs, activeTabId } = tabsStore.get();

    // Check if a tab with the same viewId and params already exists (optional de-duplication)
    // For now, we allow multiples unless specifically checked, but let's do a simple check for exact match
    // to avoid spamming if the user clicks the same link twice.
    const existingTab = tabs.find(t =>
        t.subTabs[0]?.viewId === viewId &&
        JSON.stringify(t.subTabs[0]?.params) === JSON.stringify(params)
    );

    if (existingTab) {
        if (options.focus !== false) {
            tabsStore.setKey('activeTabId', existingTab.id);
        }
        return existingTab.id;
    }

    const newTabId = uuidv4();
    const initialSubTab: SubTab = {
        id: uuidv4(),
        title: 'Main', // Default title, usually hidden or overwritten
        viewId,
        params,
        closable: false
    };

    const finalSubTabs = subTabs.length > 0 ? subTabs : [initialSubTab];

    const newTab: MainTab = {
        id: newTabId,
        title,
        icon: options.icon,
        activeSubTabId: finalSubTabs[0].id,
        subTabs: finalSubTabs,
        isClosable: options.isClosable ?? true,
    };

    tabsStore.setKey('tabs', [...tabs, newTab]);

    if (options.focus !== false || !activeTabId) {
        tabsStore.setKey('activeTabId', newTabId);
    }

    return newTabId;
};

export const closeTab = (tabId: string) => {
    const { tabs, activeTabId } = tabsStore.get();
    const tabIndex = tabs.findIndex(t => t.id === tabId);

    if (tabIndex === -1) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    tabsStore.setKey('tabs', newTabs);

    if (activeTabId === tabId) {
        // Switch to the nearest tab
        if (newTabs.length > 0) {
            // Try to go to the left, otherwise right
            const newActiveIndex = Math.max(0, tabIndex - 1);
            tabsStore.setKey('activeTabId', newTabs[newActiveIndex].id);
        } else {
            tabsStore.setKey('activeTabId', null);
        }
    }
};

export const switchTab = (tabId: string) => {
    tabsStore.setKey('activeTabId', tabId);
};

export const switchSubTab = (tabId: string, subTabId: string) => {
    const { tabs } = tabsStore.get();
    const tabIndex = tabs.findIndex(t => t.id === tabId);

    if (tabIndex === -1) return;

    const updatedTabs = [...tabs];
    updatedTabs[tabIndex] = {
        ...updatedTabs[tabIndex],
        activeSubTabId: subTabId
    };

    tabsStore.setKey('tabs', updatedTabs);
};

// --- URL Synchronization ---

const serializeState = (tabs: MainTab[], activeTabId: string | null): string => {
    if (tabs.length === 0) return '';

    const params = new URLSearchParams();

    tabs.forEach((tab, index) => {
        // Format: v=viewId(id=123)
        // We need to encode the params.
        // Let's use a simpler format: v=viewId&p=paramJson&s=subTabId
        // But we have multiple tabs.
        // Let's use JSON for the 'tabs' param for simplicity and robustness.
        // Format: ?tabs=[{...}]&active=tabId
        // To make it cleaner, we can try to minimize the JSON.

        // Minimal representation for URL
        const minimalTab = {
            id: tab.id,
            t: tab.title,
            st: tab.subTabs.map(st => ({
                id: st.id,
                t: st.title,
                v: st.viewId,
                p: st.params
            })),
            a: tab.activeSubTabId
        };
        // We can't put full JSON in URL easily without it being ugly.
        // Let's use a base64 encoded string for the state if it's complex.
        // Or just a 'tabs' query param with JSON.
    });

    // Let's go with a JSON string in a 'state' param for now, it's the most reliable for complex nested structures.
    // We can optimize later.
    const stateToSave = {
        tabs: tabs.map(t => ({
            id: t.id,
            title: t.title,
            activeSubTabId: t.activeSubTabId,
            subTabs: t.subTabs
        })),
        activeTabId
    };

    return JSON.stringify(stateToSave);
};

export const syncToUrl = () => {
    if (typeof window === 'undefined') return;

    const { tabs, activeTabId } = tabsStore.get();
    const stateString = serializeState(tabs, activeTabId);

    const url = new URL(window.location.href);
    if (stateString) {
        // Compress or encode? Base64 is cleaner than raw JSON in URL
        const encoded = btoa(encodeURIComponent(stateString));
        url.searchParams.set('tabState', encoded);
    } else {
        url.searchParams.delete('tabState');
    }

    window.history.replaceState({}, '', url.toString());
};

export const syncFromUrl = () => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const stateParam = url.searchParams.get('tabState');

    if (stateParam) {
        try {
            const decoded = decodeURIComponent(atob(stateParam));
            const parsed = JSON.parse(decoded);

            if (parsed && Array.isArray(parsed.tabs)) {
                tabsStore.set({
                    tabs: parsed.tabs,
                    activeTabId: parsed.activeTabId
                });
            }
        } catch (e) {
            console.error('Failed to parse tab state from URL', e);
        }
    }
};

// Subscribe to changes to update URL
if (typeof window !== 'undefined') {
    tabsStore.subscribe(() => {
        syncToUrl();
    });
}
